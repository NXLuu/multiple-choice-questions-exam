import React, { useState, useEffect } from 'react';
import './Result.css'
import {Card} from 'react-bootstrap';

function Result(props) {
    console.log(props);
    return (
        <div className="Result">
            <Card border="primary" >
                <Card.Header>Result</Card.Header>
                <Card.Body>
                    <Card.Title>{props.examTitle}</Card.Title>
                    <Card.Text>
                        Number of correct answers: {props.result.numberOfCorrectQuestion}
                        <br/>
                        Time: {props.time}
                    </Card.Text>
                    <Card.Text>
                    </Card.Text>
                </Card.Body>
            </Card>
            <br />
        </div>
    );
}

export default Result;