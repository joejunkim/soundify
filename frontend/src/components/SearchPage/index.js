import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import { BiSearch } from "react-icons/bi";

import './SearchPage.css'

function SearchPage() {
    const [searchValue, setSearchValue] = useState('')

    const { setType, setSource } = useContext(MusicPlayerContext)

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
        searchAlbums = albums?.filter(album => (album.name.toLowerCase().includes(searchValue.toLowerCase())))
        searchSongs = songs?.filter(song => (song.name.toLowerCase().includes(searchValue.toLowerCase())))
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
    }, [dispatch]);

    const searchNav = (
        <div id='search__input'>
            <BiSearch />
            <input onChange={(e) => setSearchValue(e.target.value)} placeholder="Search by playlist, artist, album, or song" />
        </div>
    )

    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    return (
        <div id='search__container'>
            <NavigationSide />
            <div id='search__content'>
                <NavigationTop searchNav={searchNav}/>
                <div id='search__content-results'>
                    <div className='search__header'>Playlists</div>
                    <div className='search__results'>
                        {searchPlaylists?.map(playlist => (
                            <NavLink to={`/playlist/${playlist.id}`}>
                                <div id='search__card'>
                                        <img alt='playlist image'/>
                                        {playlist.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='search__header'>Artists</div>
                    <div className='search__results'>
                        {searchArtists?.map(artist => (
                            <NavLink to={`/artist/${artist.id}`}>
                                <div id='search__card'>
                                    <img src={artist?.imgUrl} alt='artist image'/>
                                    {artist.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='search__header'>Albums</div>
                    <div className='search__results'>
                        {searchAlbums?.map(album => (
                            <NavLink to={`/album/${album.id}`}>
                                <div id='search__card'>
                                    <img src={album?.imgUrl} alt='album cover'/>
                                    {album.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='search__header'>Tracks</div>
                    <div className='search__results-songs'>
                        {searchSongs?.map(song => (
                            <div key={song.id} id='song__bar' onClick={() => playSong(song)}>
                                <div id='song__name'>{song.name}</div>
                                {song.albumId}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;
