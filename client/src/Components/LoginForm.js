import React, { useState, useEffect } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { func } from 'prop-types';

export function LoginForm(props) {
    return (
        <div className="LoginForm">
            <h1>Login to account</h1>
            <p>Access to the most powerfull tool in the entire design and web industry.</p>
            <form>
                <Input label="E-mail Address" type="text" name="email" />
                <Input label="Password" type="password" name="password" />
                <div className="flex">
                    <SubmitButton />
                    <div className="flex-item">
                        <Link message="Register for new account" />
                    </div>
                </div>
                
            </form>
        </div>
    );
}

function Link(props) {
    return <a href="/register">{props.message}</a>;
}

function SubmitButton(props) {
    return <input type="submit" value="Login" />;
};

function Input(props) {
    let icon;
    if (props.name === "email")
        icon = <FontAwesomeIcon className="icon" icon={faEnvelope} />;
    else icon = <FontAwesomeIcon className="icon" icon={faLock} />;
    return (
        <div>
            <label>
                <div className="inputIcon">
                    {icon}
                    <input type={props.type} name={props.name} placeholder={props.label} />
                </div>
            </label>
        </div>
    );
};