import React, { useState, useContext } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { TokenContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

export function LoginForm() {

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const { setToken, setFreshToken } = useContext(TokenContext);
    let location = useLocation();
    let history = useHistory();

    let { from } = location.state || { from: { pathname: '/' } };

    function loginUser(e) {
        debugger
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": userName,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3001/login", requestOptions)
            .then(response => {
                return response.json();
            })
            .then(result => {
                const { accessToken, freshToken } = result;
                setToken(accessToken);
                setFreshToken(freshToken);
                history.replace(from);
            })
            .catch(error => console.log('error', error));
        e.preventDefault();
    }

    return (
        <div className="LoginBackground">
            <div className="imageHolder">
                <div className="LoginForm">
                    <h1>Login to account</h1>
                    <p>Access to the most powerfull tool in the entire design and web industry.</p>
                    <form onSubmit={(e) => loginUser(e)}>
                        <Input label="E-mail Address" type="text" name="email" setValueInput={setUserName} />
                        <Input label="Password" type="password" name="password"
                            setValueInput={setPassword} />
                        <div className="flex">
                            <SubmitButton />
                            <div className="flex-item">
                                <Link message="Register for new account" />
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

function Link(props) {
    return <a href="/register">{props.message}</a>;
}

function SubmitButton(props) {
    return <input type="submit" value="Submit" />;
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
                    <input type={props.type} name={props.name} placeholder={props.label} onChange={(e) => { props.setValueInput(e.target.value) }} />
                </div>
            </label>
        </div>
    );
};