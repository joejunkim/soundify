import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import { getSongs } from '../../store/songs'
import { getLibSongs, deleteLibSong } from '../../store/songtolibrary';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import image from './default_playlist.png'
import './LibraryPage.css';

function LibraryPage() {
    const { type } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const songs = useSelector((state) => (state.songs))

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
                playlist.libraryId === library?.id
            ))
        }

    const libSongs = useSelector((state) => Object.values(state.librarySongs))
    let filteredSongs;
    let mySongs = [];
    if (sessionUser) {
        filteredSongs = libSongs.filter(libSong => (
            libSong.libraryId === library?.id
        ))

        filteredSongs.forEach(libSong => {
            mySongs.push(songs[libSong.songId])
        })
    }

    console.log('----> MYSONGS', mySongs)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
        dispatch(getSongs())
        dispatch(getLibSongs())
    }, [dispatch])

    const removeFromLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: sessionUser.id
        }

        dispatch(deleteLibSong(payload))
        window.location.reload()
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
                    Songs
                </div>
                <div id='song-content'>
                    {mySongs?.map((song, i) => (
                        <div key={song?.id} id='song__bar'>
                            <div id='song__id'>{i + 1}</div>
                            <div id='song__name'>{song?.name}</div>
                            <button type='click' onClick={() => removeFromLibrary(song)}>Remove</button>
                        </div>
                    ))}
                </div></>)
    }

    return (
        <div id='library__container'>
            <NavigationSide />
            <div id='library__content'>
                <NavigationTop />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
