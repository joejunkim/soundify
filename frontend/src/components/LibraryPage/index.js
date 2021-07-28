import React from 'react';
import { NavLink, useParams } from 'react-router-dom';

import Navigation from '../Navigation'
import './LibraryPage.css';

function LibraryPage() {
    const { type } = useParams();

    let collection;
    if ( type == 'playlists') {
        collection = (
            <>
                playLists
            </>
        )
    } else if ( type == 'songs') {
        collection = (
            <>
                songs
            </>
        )
    } else if ( type == 'artists') {
        collection = (
            <>
                artists
            </>
        )
    } else if ( type == 'albums') {
        collection = (
            <>
                albums
            </>
        )
    }

    return (
        <div id='library__container'>
            <div id='library__nav'>
                <NavLink to='/home' >
                    Soundify
                </NavLink>
                <NavLink to='/home' >
                    Home
                </NavLink>
                <NavLink to='/search' >
                    Search
                </NavLink>
                <NavLink to='/library/collection/playlists' >
                    Your Library
                </NavLink>
                <button>
                    Create Playlist
                </button>
            </div>
            <div id='library__content'>
                <Navigation />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
