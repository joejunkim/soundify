import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPlayLists } from '../../store/playlist';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import EditPlaylistModal from '../EditPlaylistModal'
import DeletePlaylistModal from '../DeletePlaylistModal'
import './PlaylistPage.css';

function PlaylistPage() {
    const { id } = useParams();
    const playlist = useSelector((state) => state.playlists[id])

    const dispatch = useDispatch();
    const reload = () => window.location.reload()

    useEffect(() => {
        dispatch(getPlayLists)
    }, [dispatch]);

    return (
        <div id='playlist-info__container'>
            <NavigationSide />
            <div id='playlist-info__content'>
                <NavigationTop />
                <div id='playlist-info__header'>
                    <div id='playlist-info__img'></div>
                    <div id='playlist-info__info'>
                        <div id='playlist-info__sub'>{'PLAYLIST'}</div>
                        <div id='playlist-info__title'>{playlist?.title}</div>
                        <div id='playlist-info__sub'>{playlist?.description}</div>
                    </div>
                </div>
                <div id='playlist-info__options'>
                    <div><EditPlaylistModal playlist={playlist} onExit={reload}/></div>
                    <div><DeletePlaylistModal /></div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;
