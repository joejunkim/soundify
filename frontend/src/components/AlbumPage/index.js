import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAlbums } from '../../store/albums'
import { getSongs } from '../../store/songs'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import './AlbumPage.css';

function AlbumPage() {
    const { id } = useParams();
    const album = useSelector((state) => state.albums[id])
    const songs = useSelector((state) => Object.values(state.songs))

    const albumSongs = songs?.filter(song => (
        song.albumId == id
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getSongs())
    }, [dispatch]);

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
                        <div id='album-info__sub'>{album?.description}</div>
                    </div>
                </div>
                <div id='song__header'>Songs</div>
                <div id='song__container'>
                    <div id='song__content'>
                        {albumSongs?.map((song, i) => (
                            <div key={song.id} id='song__bar'>
                                <div id='song__id'>{i + 1}</div>
                                <div id='song__name'>{song.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;
