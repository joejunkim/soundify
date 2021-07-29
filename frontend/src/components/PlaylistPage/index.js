import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPlayLists } from '../../store/playlist';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import './PlaylistPage.css';

function PlaylistPage() {
    const { id } = useParams();
    const playlist = useSelector((state) => state.playlists[id])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayLists)
    }, dispatch);

    return (
        <div id='playlist-info__container'>
            <NavigationSide />
            <div id='playlist-info__content'>
                <NavigationTop />
                {playlist?.title}
                {playlist?.description}
            </div>
        </div>
    )
}

export default PlaylistPage;
