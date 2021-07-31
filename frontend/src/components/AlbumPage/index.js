import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAlbums } from '../../store/albums'
import { getSongs } from '../../store/songs'
import { getLibSongs, createLibSong, deleteLibSong } from '../../store/songtolibrary'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

import './AlbumPage.css';

function AlbumPage() {
    const [inLibrary, setInLibrary] = useState(false)

    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const album = useSelector((state) => state.albums[id])
    const songs = useSelector((state) => Object.values(state.songs))

    const albumSongs = songs?.filter(song => (
        song.albumId == id
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getLibSongs())
    }, [dispatch, createLibSong]);

    const addToLib = (song) => {
        const payload = {
            songId: song.id,
            libraryId: sessionUser.id
        }

        dispatch(createLibSong(payload))
        // setInLibrary(true)
    }

    const removeFromLib = () => {
        // setInLibrary(false)
    }

    return (
        <div id='album-info__container'>
            <NavigationSide />
            <div id='album-info__content'>
                <NavigationTop />
                <div id='album-info__header'>
                    <img alt='album image'/>
                    <div id='album-info__info'>
                        <div id='album-info__sub'>{'ALBUM'}</div>
                        <div id='album-info__name'>{album?.name}</div>
                        <div id='album-info__sub'>{album?.year}</div>
                    </div>
                </div>
                <div id='song__header'>Songs</div>
                <div id='song__container'>
                    <div id='song__content'>
                        {albumSongs?.map((song, i) => (
                            <div key={song.id} id='song__bar'>
                                <div id='song__id'>{i + 1}</div>
                                <div id='song__name'>{song?.name}</div>
                                { !inLibrary
                                    ?   (<div id='song__heart'>
                                            {/* <AiOutlineHeart type='click' onClick={(song) => addToLib}/> */}
                                            <button type='click' onClick={() => addToLib(song)}>Add</button>
                                        </div>)
                                    :   (<div id='song__heart'>
                                            <AiFillHeart type='click' onClick={() => removeFromLib(song)}/>
                                        </div>)
                                }
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;
