import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import default_pic from './default.png'
import './HomePage.css'

function HomePage() {
    const playlists = useSelector((state) => Object.values(state.playlists))
    const artists = useSelector((state) => Object.values(state.artists))
    const albums = useSelector((state) => Object.values(state.albums))
    const orderedArtists = useSelector((state) => Object.values(state.artists))

    const shuffle = (array) => {
        let currentIndex = array.length
        let randomIndex;

        while (0 !== currentIndex) {

          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const getArtistNameAlbum = (album) => orderedArtists[album.artistId - 1]?.name

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
                    <div className='home__header'>Explore Playlists</div>
                    <div className='home__cards'>
                        {shuffle(playlists).map(playlist => (
                            <NavLink key={playlist?.id} to={`/playlist/${playlist?.id}`}>
                                <div id='random__card'>
                                    { playlist?.image
                                            ? (<img src={playlist?.image} alt='playlist'/>)
                                            : (<img src={default_pic} alt='playlist'/>)}
                                    {playlist?.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='home__header'>Explore Artists</div>
                    <div className='home__cards'>
                        {shuffle(artists).map(artist => (
                            <NavLink key={artist?.id} to={`/artist/${artist?.id}`}>
                                <div id='random__card'>
                                    <img src={artist?.imgUrl} alt='artist'/>
                                    {artist?.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='home__header'>Explore Albums</div>
                    <div className='home__cards'>
                        {shuffle(albums).map(album => (
                            <NavLink key={album?.id} to={`/album/${album?.id}`}>
                                <div id='random__card'>
                                    <img src={album?.imgUrl} alt='album'/>
                                    <div id='random__card-name'>{album?.name}</div>
                                    <div id='random__card-sub'>{getArtistNameAlbum(album)}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
