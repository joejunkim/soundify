import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import image from './default_playlist.png'

import './ArtistPage.css';

function ArtistPage() {
    const { id } = useParams();
    const artist = useSelector((state) => state.artists[id])
    const albums = useSelector((state) => Object.values(state.albums))

    const artistAlbums = albums?.filter(album => (
        album.artistId == id
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists())
        dispatch(getAlbums())
    }, [dispatch]);

    return (
        <div id='artist-info__container'>
            <NavigationSide />
            <div id='artist-info__content'>
                <NavigationTop />
                <div id='artist-info__header'>
                    { artist?.imgUrl ? (<img src={artist?.imgUrl} alt='artist'/>) : (<img src={image} alt='artist'/>)}
                    <div id='artist-info__info'>
                        <div id='artist-info__sub'>{'ARTIST'}</div>
                        <div id='artist-info__name'>{artist?.name}</div>
                        <div id='artist-info__sub'>{artist?.description}</div>
                    </div>
                </div>
                <div id='album__header'>Albums</div>
                <div id='album__container'>
                    <div id='album__content'>
                        {artistAlbums?.map(album => (
                            <NavLink to={`/album/${album.id}`}>
                                <div id='album__card'>
                                    <img src={album?.imgUrl} alt='album cover'/>
                                    <div id='album__name'>{album.name}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArtistPage;
