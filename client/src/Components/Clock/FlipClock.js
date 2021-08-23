import React from 'react';
import './FlipClock.css';


// function component
const AnimatedCard = ({ animation, digit }) => {
  return (
    <div className={`flipCard ${animation}`}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const StaticCard = ({ position, digit }) => {
  return (
    <div className={position}>
      <span>{digit}</span>
    </div>
  );
};

// function component
const FlipUnitContainer = ({ digit, shuffle, unit }) => {

  // assign digit values
  let currentDigit = digit;
  let previousDigit = digit - 1;

  // to prevent a negative value
  if (unit !== 'hours') {
    previousDigit = previousDigit === -1
      ? 59
      : previousDigit;
  } else {
    previousDigit = previousDigit === -1
      ? 23
      : previousDigit;
  }

  // add zero
  if (currentDigit < 10) {
    currentDigit = `0${currentDigit}`;
  }
  if (previousDigit < 10) {
    previousDigit = `0${previousDigit}`;
  }

  // shuffle digits
  const digit1 = shuffle
    ? previousDigit
    : currentDigit;
  const digit2 = !shuffle
    ? previousDigit
    : currentDigit;

  // shuffle animations
  const animation1 = shuffle
    ? 'fold'
    : 'unfold';
  const animation2 = !shuffle
    ? 'fold'
    : 'unfold';

  return (
    <div className={'flipUnitContainer'}>
      <StaticCard
        position={'upperCard'}
        digit={currentDigit}
      />
      <StaticCard
        position={'lowerCard'}
        digit={previousDigit}
      />
      <AnimatedCard
        digit={digit1}
        animation={animation1}
      />
      <AnimatedCard
        digit={digit2}
        animation={animation2}
      />
    </div>
  );
};

// class component
export default class FlipClock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      hours: 0,
      hoursShuffle: true,
      minutes: 0,
      minutesShuffle: true,
      seconds: 0,
      secondsShuffle: true
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.updateTime(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
    const {
      hours,
      minutes,
      seconds,
    } = this.state;
      this.props.getTime(this.addZeroLess10(hours) + ':' + this.addZeroLess10(minutes) + ':' + this.addZeroLess10(seconds));
  }

  showTime() {
    const time = this.state.time;

    let hours = (Math.floor(time / 3600));
    let minutes = (Math.floor((time % 3600) / 60));
    let seconds = ((time % 3600) % 60);


    return { hours, minutes, seconds }
  }

  updateTime() {
    // get new date
    this.setState({ time: this.state.time + 1 });
    // set time units
    const { hours, minutes, seconds } = this.showTime();
    // on hour chanage, update hours and shuffle state
    if (hours !== this.state.hours) {
      const hoursShuffle = !this.state.hoursShuffle;
      this.setState({
        hours,
        hoursShuffle
      });
    }
    // on minute chanage, update minutes and shuffle state
    if (minutes !== this.state.minutes) {
      const minutesShuffle = !this.state.minutesShuffle;
      this.setState({
        minutes,
        minutesShuffle
      });
    }
    // on second chanage, update seconds and shuffle state
    if (seconds !== this.state.seconds) {
      const secondsShuffle = !this.state.secondsShuffle;
      this.setState({
        seconds,
        secondsShuffle
      });
    }
  }

  addZeroLess10(time) {
    if (time > 9) return time;
    return '0' + time;
  }

  render() {

    // state object destructuring
    const {
      hours,
      minutes,
      seconds,
      hoursShuffle,
      minutesShuffle,
      secondsShuffle
    } = this.state;



    return (
      <div className={'flipClock'}>
        <FlipUnitContainer
          unit={'hours'}
          digit={hours}
          shuffle={hoursShuffle}
        />
        <FlipUnitContainer
          unit={'minutes'}
          digit={minutes}
          shuffle={minutesShuffle}
        />
        <FlipUnitContainer
          unit={'seconds'}
          digit={seconds}
          shuffle={secondsShuffle}
        />
      </div>
    );
  }
}

