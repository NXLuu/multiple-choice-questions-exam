
import React, { useState, useContext } from 'react';
import './LoginForm.css';
import { TokenContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

export function Logout() {
    const { token , setToken} = useContext(TokenContext);
    const history = useHistory();

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        // history.replace('/');
    }
    return token? <span className="" onClick={logout}>Logout</span>:<span></span>
}