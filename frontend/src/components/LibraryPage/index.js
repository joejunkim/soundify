import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library'

import Navigation from '../Navigation'
import './LibraryPage.css';

function LibraryPage() {
    const { type } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.library) // Need to query sessionUser.id
    const allPlaylists = useSelector((state) => Object.values(state.playlists))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibraries())
    }, [dispatch])

    let collection;
    if ( type === 'playlists') { collection = ( <>playLists</> )
    } else if ( type === 'songs') { collection = ( <>songs</> )
    } else if ( type === 'artists') { collection = ( <>artists</>)
    } else if ( type === 'albums') { collection = ( <>albums</> )
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
