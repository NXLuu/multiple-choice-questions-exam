import React, { useState, useEffect, useContext } from 'react';
import './MenuExam.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Exam from '../Exam/Exam';
import Loading from '../LoadingPage/Loading';
import { TokenContext } from '../../App';


function MenuExam(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [exams, setExams] = useState([]);

    const { token, freshToken, setToken, setFreshToken } = useContext(TokenContext);

    console.log(typeof token);
    useEffect(() => {
        debugger
        let myHeaders = new Headers();
        myHeaders.append("x-access-token", token);

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        if (!isLoaded)
            fetch("http://localhost:3001/exam", requestOptions)
                .then(response => {
                    console.log(response);
                    if (!response.ok && response.statusText === "Unauthorized") {
                        setIsLoaded(false);
                        setError(response.statusText);
                        setToken(null);
                    } else 
                    return response.json()
                })
                .then(
                    result => {
                        debugger;
                        if (!result) return;
                        setIsLoaded(true);
                        setExams(result);
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
        const examComponents = exams.map((exam, index) => {
            return <ExamCard key={index} examName={exam.title} numberOfQuestions={exam.length} examId={exam._id} />
        });
        return (
            <div className="MenuExam">
                <h1>Menu Exam</h1>
                <div className="GridLayout">
                    {examComponents}
                </div>
            </div>
        );
    }
}

function ExamCard(props) {
    let match = useRouteMatch();

    return (
        <div>
            <Link style={{ textDecoration: 'none', color: 'black' }} to={`${match.url}/${props.examId}`} >
                <div className="ExamCard">
                    <div className="Icon"></div>
                    <h3>{props.examName}</h3>
                    <div className="flex-container">
                        <FontAwesomeIcon icon={faListUl} />
                        <p>{props.numberOfQuestions} questions</p>
                    </div>
                </div>
            </Link>


        </div>

    );
}

function MenuExamSwitch(props) {

    let match = useRouteMatch();

    return (
        <Switch>
            <Route exact path='/exam' >
                <MenuExam />
            </Route>

            <Route path={`${match.path}/:examId`}>
                <Exam />
            </Route>
        </Switch>
    );

}

export default MenuExamSwitch;