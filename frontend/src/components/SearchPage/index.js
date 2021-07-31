import React, { useState, useEffect } from 'react';
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
    const [searchValue, setSearchValue] = useState('')

    const playlists = useSelector((state) => Object.values(state.playlists))
    const artists = useSelector((state) => Object.values(state.artists))
    const albums = useSelector((state) => Object.values(state.albums))
    const songs = useSelector((state) => Object.values(state.songs))

    let searchPlaylists;
    let searchArtists;
    let searchAlbums;
    let searchSongs;

    if (searchValue) {
        searchPlaylists = playlists?.filter(playlist => (playlist.name.toLowerCase().includes(searchValue.toLowerCase())))
        searchArtists = artists?.filter(artist => (artist.name.toLowerCase().includes(searchValue.toLowerCase())))
        searchAlbums = albums?.filter(album => (album.name.toLowerCase() == searchValue.toLowerCase()))
        searchSongs = songs?.filter(song => (song.name.toLowerCase() == searchValue.toLowerCase()))
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
    }, [dispatch]);

    const searchNav = (
        <input onChange={(e) => setSearchValue(e.target.value)} placeholder="Search by playlist, artist, album, or song" />
    )

    return (
        <div id='search__container'>
            <NavigationSide />
            <div id='search__content'>
                <NavigationTop searchNav={searchNav}/>
                <div className='search__header'>Playlists</div>
                {searchPlaylists?.map(playlist => (
                    <div>{playlist.name}</div>
                ))}
                <div className='search__header'>Artists</div>
                {searchArtists?.map(artist => (
                    <div>{artist.name}</div>
                ))}
                <div className='search__header'>Albums</div>
                {searchAlbums?.map(album => (
                    <div>{album.name}</div>
                ))}
                <div className='search__header'>Songs</div>
                {searchSongs?.map(song => (
                    <div>{song.name}</div>
                ))}
            </div>
        </div>
    )
}

export default SearchPage;
