import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import { RiSoundcloudLine } from "react-icons/ri"
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
                    <NavLink to='/home' id='logo'>
                        <RiSoundcloudLine id='logo-img'/>
                        <div>Soundify</div>
                    </NavLink>
                    <div id='landing__navbar-session'>
                        <button onClick={() => handleDemo()}>Demo User</button>
                        <SignupFormModal/>
                        <LoginFormModal />
                    </div>
                </div>
            </div>
            <div id='landing__main'>
                <div id='landing__content'>
                    <div id='landing__intro'>'life is one grand sweet song, so start the music'</div>
                    <NavLink to='/home'>Let's Get Started</NavLink>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
