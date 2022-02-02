
import React, { useState, useEffect, useContext } from 'react';
import './Home.css'
import Loading from '../LoadingPage/Loading';
import { TokenContext } from '../../App';
import { Link } from 'react-router-dom';


export default function Home(props) {
    return (
        <div className="HomePage">

            <div className="HomeCard">
                <div className="Wrap">
                    <div className="Overlay">
                        <div className="RoundHomeDiv">
                            <div className="HomeImage"></div>
                        </div>
                        <div className="SquareHomeDiv">
                        </div>
                    </div>
                </div>

                <div className="HomeParagraph">
                    <h1>Never Stop Learning</h1>
                    <p>Build skills with courses, certificates, and degrees online from world-class universities and companies.</p>
                    <Link to='/login'>
                        <button className="btn btn-primary">Login</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}