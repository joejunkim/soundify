import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import CreatePlaylistModal from '../CreatePlaylistModal';

import { BiSearch, BiHomeAlt } from "react-icons/bi";
import { VscLibrary } from "react-icons/vsc"
import { RiPlayListLine } from "react-icons/ri"
import { CgPlayListAdd } from "react-icons/cg"

import { RiSoundcloudLine } from "react-icons/ri"
import './NavigationSide.css';

function NavigationSide({ library }) {
    const sessionUser = useSelector(state => state.session.user);
    const myLibrary = useSelector((state) => state.libraries[sessionUser?.id])

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
            playlist.libraryId === myLibrary?.id
        ))
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
    }, [dispatch])

    return (
        <div id='navbar-side__container'>
                <NavLink to='/' id='navbar-side__logo' activeClassName=''>
                    <RiSoundcloudLine/>
                    Soundify
                </NavLink>
            <div id='navbar-side__links'>
                <NavLink to='/home' >
                    <BiHomeAlt className='navbar-icon'/>Home
                </NavLink>
                <NavLink to='/search' >
                    <BiSearch className='navbar-icon'/>Search
                </NavLink>
                { sessionUser
                    ? (<NavLink to='/library/collection/playlists' ><VscLibrary className='navbar-icon'/>Your Library</NavLink>)
                    : (<></>)
                }
            </div>
            { sessionUser
                ? (<div id='navbar-side__playlists'>
                        <div id='navbar-side__create'>
                            <CreatePlaylistModal />
                        </div>
                        <div id='navbar-side__playlists-name'>
                            Your Playlists
                        </div>
                        {myPlaylists?.map(playlist => (
                            <NavLink to={`/playlist/${playlist.id}`} key={playlist.id}>
                                <RiPlayListLine className='navbar-icon'/> {playlist.name}
                            </NavLink>
                        ))}
                    </div>)
                : (<></>)
            }
        </div>
    )
}

export default NavigationSide;
