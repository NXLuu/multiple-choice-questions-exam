import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

function User(props) {
    return <h1>Hello {props.name}</h1>
}

export default function Exam(props) {
    return(
        <div className="Exam">
            <User name="Luu" />
        </div>
    );
}