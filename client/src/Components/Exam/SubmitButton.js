import React, { useState, useEffect } from 'react';
import './QuestionPage.css'
export default function SubmitButton(props) {
    let className = props.small? "SubmitButton small": "SubmitButton";
    return (
        <button className={className} type="submit" value="Submit">Submit</button>
    );
}