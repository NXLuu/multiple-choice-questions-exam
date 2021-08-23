import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import './Controllbar.css';

import Clock from '../Clock/Clock';
import SubmitButton from './SubmitButton';
import FlipClock from '../Clock/FlipClock';

function UserInfor(props) {
    return (
        <div className="UserContainer">
            <div className="UserCard">
                <div className="UserImage"></div>
            </div>
            <h2>Hello {props.name}</h2>
        </div>
    );
}

function QuestionBox(props) {

    const goToQuestion = (number) => {
        document.querySelector(`div[number="${number}"]`).scrollIntoView();
    }

    return (
        <div
            className="QuestionBox"
            onClick={() => goToQuestion(props.number)} id={props.number}>
            <FontAwesomeIcon className="icon" icon={faCheckCircle} />
            <div>
                {props.number}
            </div>
        </div>

    );
}

function ListQuestionBox({ questions }) {

    const listQuestions = questions.map((question, index) => {
        return <QuestionBox key={index} number={index} />
    });
    return (
        <div className="ListQuestionBox">
            {listQuestions}
        </div>
    );
}

export default function ControllBar({ point, getTime, questions }) {
    return (
        // <div className="ControllBarContainer">
            <div className="ControllBar">
                <UserInfor name="Luu" />
                <div style={{
                    padding: '10px',
                    marginTop: '10px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <FlipClock getTime={getTime} point={point} />
                    <SubmitButton small />
                </div>

                <ListQuestionBox questions={questions} />
            </div>
        // </div>

    );
}