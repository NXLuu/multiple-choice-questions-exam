import React, { useState, useEffect, useContext } from 'react';
import ControllBar from './ControllBar';
import QuestionPage from './QuestionPage';
import './Exam.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Loading from '../LoadingPage/Loading';
import { TokenContext } from '../../App';

export const DoneQuestions = React.createContext([]);

function User(props) {
    return <h1>Hello {props.name}</h1>
}

export default function Exam(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [doneQuestions, setDoneQuestion] = useState(new Set());
    const [examTitle, setExamTitle] = useState(null);
    const { token, freshToken } = useContext(TokenContext);
    const { examId } = useParams();


    const addNewDoneQuestion = (questionNumber) => {
        setDoneQuestion(doneQuestions.add(questionNumber));
    }

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        if (!isLoaded)
            fetch(`http://localhost:3001/exam/${examId}`, requestOptions)
                .then(response => response.json())
                .then(
                    result => {
                        setIsLoaded(true);
                        setQuestions(result.questions);
                        setExamTitle(result.examTitle);
                    },
                    error => {
                        setIsLoaded(false);
                        setError(error);
                    }
                )
    });
    if (error) {
        return <div>{error.message}</div>
    } else if (!isLoaded) {
        return <Loading />
    } else {
        return (

            <div className="Exam">
                <DoneQuestions.Provider value={
                    {
                        doneQuestions,
                        addNewDoneQuestion
                    }
                }>
                    {/* <ControllBar questions={questions} /> */}
                    <QuestionPage questions={questions} examTitle={examTitle} />
                </DoneQuestions.Provider>
            </div>
        );
    }
}