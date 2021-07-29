import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import CreatePlaylistModal from '../CreatePlaylistModal';

import './NavigationSide.css';

function NavigationSide() {
    const sessionUser = useSelector(state => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
            playlist.libraryId === library?.id
        ))
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
    }, [dispatch])

    return (
        <div id='navbar-side__container'>
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
                <CreatePlaylistModal />
            </button>
            {myPlaylists?.map(playlist => (
                <NavLink to={`/playlist/${playlist.id}`}>
                    {playlist.title}
                </NavLink>
            ))}
        </div>
    )
}

export default NavigationSide;
