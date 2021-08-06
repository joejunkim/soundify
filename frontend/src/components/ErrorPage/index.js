import React from 'react';
import { NavLink } from "react-router-dom";

import { MdBrokenImage } from "react-icons/md"

import './ErrorPage.css'

function ErrorPage() {

    return (
        <div id='error__container'>
            <h1><MdBrokenImage id='error__image'/>404 Error</h1>
            <div>These are not the vibes you're looking for</div>
            <NavLink to='/home'>Return Home</NavLink>
        </div>
    )
}

export default ErrorPage;
