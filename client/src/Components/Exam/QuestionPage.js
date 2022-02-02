import React, { useState, useEffect } from 'react';
import './QuestionPage.css'
import SubmitButton from './SubmitButton';
import ControllBar from './ControllBar';
import Result from './Result';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';


const AnswerContext = React.createContext();

export default function QuestionPage({ examTitle, questions }) {

    const [answer, setAnswer] = useState({});
    const [point, setPoint] = useState(null);
    const [doneTime, setDoneTime] = useState(null);

    const submitForm = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(answer);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://multichoice-question.herokuapp.com/post-answer", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(result => {
                setPoint(result);
            })
            .catch(error => console.log('error', error));

        e.preventDefault();
    }

    const handleSelectedChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        console.log(answer);
        answer[name] = value;
        setAnswer(answer);
    }

    const getTimeCallBack = (time) => {
        setDoneTime(time);
    }

    useEffect(() => {
        
    });

    const listQuestions = questions.map((question, index) => {
        return <Question
            key={index}
            id={question._id}
            number={index}
            question={question.question}
            options={question.options}
            handleChange={() => { handleSelectedChange() }}
        />
    });


    if (point == null)
        return (

            <div className="QuestionPage">
                <form onSubmit={submitForm}>
                    <div className="title">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <div className="roundDiv">
                                <FontAwesomeIcon icon={faBookOpen} />

                            </div>
                            <span className="ExamText" style={{
                                color: 'transparent',
                                WebkitTextStroke: '1.2px black',
                                fontWeight: '800px',
                                fontSize: '3em',
                                paddingLeft: '1rem  '
                            }}>
                                EXAM
                            </span>
                        </div>

                        <h1>{examTitle}</h1>
                    </div>

                    <AnswerContext.Provider value={{ handleSelectedChange }}>
                        {listQuestions}
                        <SubmitButton />
                        <ControllBar 
                            questions={questions} 
                            getTime={getTimeCallBack}
                            point={point}
                        />
                    </AnswerContext.Provider>
                </form>
            </div>
        );
    else {
        console.log(doneTime);
        return <Result result={point} examTitle={examTitle} time={doneTime} />
    }
}

function Question(props) {
    const listOptionsComponent = props.options.map((option, index) => {
        return <Option
            name={props.id}
            id={props.id + option[0]}
            value={option[0]}
            key={index}
            index={props.number}
            text={option[1]}
        />
    });
    return (
        <div className="Question" number={props.number}>
            <h3>
                <span>
                    {props.number}
                </span>: {props.question}</h3>
            {listOptionsComponent}
        </div>
    );
}

function Option(props) {
    const activeQuestion = (e, handleChange) => {
        const index = props.index + "";
        let questionBoxNeedActive = document.getElementById(index);
        if (!questionBoxNeedActive.classList.contains("active"))
            questionBoxNeedActive.classList.add('active');
        handleChange(e);

    }
    return (
        <AnswerContext.Consumer>
            {(context) => {

                return (
                    <div className="Option">
                        <input
                            type="radio"
                            id={props.id}
                            name={props.name}
                            value={props.value}
                            onClick={(e) => activeQuestion(e, context.handleSelectedChange)}
                        />
                        <label for={props.id}>{props.text}</label>
                    </div>
                )

            }}

        </AnswerContext.Consumer>


    );
}

