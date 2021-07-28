import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Navigation from '../Navigation'
import './LibraryPage.css';

function LibraryPage() {
    return (
        <div id='library__container'>
            <div id='library__nav'>
                <NavLink to='/library' >
                    Home
                </NavLink>
                <NavLink to='/library/search' >
                    Search
                </NavLink>
                <NavLink to='/library/collections/:category' >
                    Your Library
                </NavLink>
                <button>
                    Create Playlist
                </button>
            </div>
            <div id='library__content'>
                <Route path='/library/collections/:category'>
                    <Navigation />
                </Route>
            </div>
        </div>
    )
}

export default LibraryPage;
