import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getArtists } from '../../store/artists';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import image from './default_playlist.png'

import './ArtistPage.css';

function ArtistPage() {
    const { id } = useParams();
    const artist = useSelector((state) => state.artists[id])

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists())
    }, [dispatch]);

    return (
        <div id='artist-info__container'>
            <NavigationSide />
            <div id='artist-info__content'>
                <NavigationTop />
                <div id='artist-info__header'>
                    <img src={image} alt='artist image'/>
                    <div id='artist-info__info'>
                        <div id='artist-info__sub'>{'ARTIST'}</div>
                        <div id='artist-info__name'>{artist?.name}</div>
                        <div id='artist-info__sub'>{artist?.description}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage;
