import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    return (
        <div id='landing__container'>
            <div id='landing__content'>
                <div id='landing__content-main'>
                    Listening is everything
                </div>
                <NavLink to='/home'>
                    <button>
                        Let's Get Started
                    </button>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage;
