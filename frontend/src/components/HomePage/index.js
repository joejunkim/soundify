import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import './HomePage.css'

function HomePage() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    return (
        <div id='homepage__container'>
            <NavigationSide />
            <div id='homepage__content'>
                <NavigationTop />
            </div>
        </div>
    )
}

export default HomePage;
