import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './LandingPage.css';

function LandingPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    if (sessionUser) return <Redirect to="/home" />;

    const handleDemo = () => {
        const credential = 'DemoUser'
        const password = 'password'
        dispatch(sessionActions.login({ credential, password }))
    }

    return (
        <div id='landing__container'>
            <div id='landing__navbar'>
                <div id='landing__navbar-content'>
                    <NavLink to='/' activeClassName=''>
                        <div>Soundify</div>
                    </NavLink>
                    <div id='landing__navbar-session'>
                        <button onClick={() => handleDemo()}>
                            Demo User
                        </button>
                        <SignupFormModal/>
                        <LoginFormModal />
                    </div>
                </div>
            </div>
            <div id='landing__content'>
                <div id='landing__content-main'>
                    Listening is everything
                    <NavLink to='/home'>
                        Let's Get Started
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
