import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library'
import { getPlayLists } from '../../store/playlist'

import Navigation from '../Navigation'
import './LibraryPage.css';

function LibraryPage() {
    const { type } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[1]) // Need to query sessionUser.id
    const playlists = useSelector((state) => Object.values(state.playlists))

    const myPlaylists = playlists.filter(playlist => (
        playlist.libraryId === library.id
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
    }, [dispatch])

    let collection;
    if ( type === 'playlists') { collection = (
        <>
            <div id='collection__title'>
                {type[0].toUpperCase() + type.slice(1)}
            </div>
            <div id='playlist__container'>
                {myPlaylists?.map(playlist => (
                    <NavLink to={`/playlist/${playlist.id}`}>
                        <div id='playlist__card'>
                            <div id='playlist__img'>
                                {playlist.imgUrl}
                            </div>
                            <div id='playlist__title'>
                                {playlist.title}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
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
                {myPlaylists?.map(playlist => (
                    <NavLink to={`/playlist/${playlist.id}`}>
                        {playlist.title}
                    </NavLink>
                ))}
            </div>
            <div id='library__content'>
                <Navigation />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
