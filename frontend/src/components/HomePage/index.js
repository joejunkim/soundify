import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from 'react-router-dom';
import * as sessionActions from "../../store/session";
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import './HomePage.css'

function HomePage() {
    const playlists = useSelector((state) => Object.values(state.playlists))
    const artists = useSelector((state) => Object.values(state.artists))
    const albums = useSelector((state) => Object.values(state.albums))

    const randomize = (array) => {
        let max = array.length
        let num = function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        // return array(num)
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
    }, [dispatch]);

    return (
        <div id='home__container'>
            <NavigationSide />
            <div id='home__content'>
                <NavigationTop />
                <div id='home__results'>
                    <div className='home__header'>Our Playlist Picks</div>
                    <div className='home__cards'>
                        {randomize(playlists)}
                    </div>
                    <div className='home__header'>Our Album Picks</div>
                    <div className='home__cards'>

                    </div>
                    <div className='home__header'>Our Artist Picks</div>
                    <div className='home__cards'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
