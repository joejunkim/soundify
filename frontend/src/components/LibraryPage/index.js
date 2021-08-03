import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import { getSongs } from '../../store/songs'
import { getlibrarySongs, deletelibrarySong } from '../../store/songtolibrary';
import { MusicPlayerContext } from '../../context/MusicPlayer'

import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import { BiTrash } from "react-icons/bi"
import image from './default_playlist.png'
import './LibraryPage.css';

function LibraryPage() {
    const { library, type } = useParams();
    const { setType, setSource } = useContext(MusicPlayerContext)
    const sessionUser = useSelector((state) => state.session.user);
    const myLibrary = useSelector((state) => state.libraries[sessionUser?.id])
    const songs = useSelector((state) => (state.songs))

    const dispatch = useDispatch();

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
                playlist.libraryId === myLibrary?.id
            ))
        }

    const librarySongs = useSelector((state) => Object.values(state.librarySongs))

    let mySongs = [];
    const filteredSongs = librarySongs.filter(librarySong => (
        librarySong.libraryId === myLibrary?.id
    ))

    filteredSongs.forEach(librarySong => {
        mySongs.push(songs[librarySong.songId])
    })

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
        dispatch(getSongs())
        dispatch(getlibrarySongs())
    }, [dispatch])

    const removeFromLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: sessionUser.id
        }

        dispatch(deletelibrarySong(payload))
        window.location.reload()
    }

    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    let collection;
    if ( type === 'playlists') {
        collection = (<><div id='collection__name'>
                            Playlists
                        </div>
                        <div id='playlist__container'>
                            {myPlaylists?.map(playlist => (
                                <NavLink to={`/playlist/${playlist.id}`}>
                                    <div id='playlist__card'>
                                        <img src={image} alt='playlist image'/>
                                        <div id='playlist__name'>{playlist.name}</div>
                                    </div>
                                </NavLink>
                    ))}
                </div></>)
    } else if ( type === 'artists') {
        collection = (
            <><div id='collection__name'>
                    Artists
                </div></> )
    } else if ( type === 'albums') {
        collection = (
            <><div id='collection__name'>
                    Albums
                </div></> )
    } else if ( type === 'songs') {
        collection = (
            <><div id='collection__name'>
                    Tracks
                </div>
                <div id='song-content'>
                    {mySongs?.map((song, i) => (
                        <div key={song?.id} id='song__bar' onClick={() => playSong(song)}>
                            <div id='song__id'>{i + 1}</div>
                            <div id='song__name'>{song?.name}</div>
                            <button type='click' onClick={() => removeFromLibrary(song)}><BiTrash /></button>
                        </div>
                    ))}
                </div></>)
    }

    return (
        <div id='library__container'>
            <NavigationSide library={library}/>
            <div id='library__content'>
                <NavigationTop />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
