import React, { useState, useEffect } from 'react';
import './Clock.css'
function Clock(props) {
    const [time, setTime] = useState(0);
    let timerId;
    useEffect(() => {
        let timeId = setInterval(() => {
            setTime(time + 1);
        }, 1000);

        return function cleanup() {
            clearInterval(timeId);
        }
    });

   
    function showTime() {
        function addZeroBefore(value) {
            if (value <= 9)
                return value = '0' + value;
            return value
        }

        let hours = addZeroBefore(Math.floor(time / 3600));
        let minutes = addZeroBefore(Math.floor((time % 3600) / 60));
        let second = addZeroBefore((time % 3600) % 60);
        
        
        return hours + ":" + minutes + ":" + second;
    }

    return (
        <div className="Clock">
            {showTime()}
        </div>
    );
}

export default Clock;