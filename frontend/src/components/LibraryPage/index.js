import React from 'react';
import { NavLink } from 'react-router-dom';
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
                <NavLink to='/library/collections' >
                    Your Library
                </NavLink>
                <button>
                    Create Playlist
                </button>
            </div>
            <div id='library__content'>

            </div>
        </div>
    )
}

export default LibraryPage;
