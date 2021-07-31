import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import './SearchPage.css'

function SearchPage() {
    const playlists = useSelector((state) => Object.values(state.playlists))
    const artists = useSelector((state) => Object.values(state.artists))
    const albums = useSelector((state) => Object.values(state.albums))
    const songs = useSelector((state) => Object.values(state.songs))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
    }, [dispatch]);

    const searchNav = (
        <input placeholder="Search by playlist, artist, album, or song" />
    )

    return (
        <div id='search__container'>
            <NavigationSide />
            <div id='search__content'>
                <NavigationTop searchNav={searchNav}/>
                <div className='search__header'>Playlists</div>
                <div className='search__header'>Artists</div>
                <div className='search__header'>Albums</div>
                <div className='search__header'>Songs</div>
            </div>
        </div>
    )
}

export default SearchPage;
