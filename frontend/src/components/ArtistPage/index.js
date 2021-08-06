import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums'
import { getLibrarySongs } from '../../store/songtolibrary'
import { getLibraryArtists, createLibraryArtist, deleteLibraryArtist } from '../../store/artisttolibrary'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import image from './default_playlist.png'

import './ArtistPage.css';

function ArtistPage() {
    const { id } = useParams();

    const [ trigger, setTrigger ] = useState(false)

    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const artist = useSelector((state) => state.artists[id])
    const albums = useSelector((state) => Object.values(state.albums))
    const libraryArtists = useSelector((state) => Object.values(state.libraryArtists))

    const artistAlbums = albums?.filter(album => (
        album.artistId === parseInt(id)
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getLibraryArtists())
        dispatch(getLibrarySongs())
    }, [dispatch, trigger]);

    const addArtistToLibrary = async(artist) => {
        const payload = {
            artistId: artist.id,
            libraryId: library.id
        }

        await dispatch(createLibraryArtist(payload))
        setTrigger(prev => !prev)
        window.alert("Artist added to library")
    }

    const removeArtistFromLibrary = async(artist) => {
        const payload = {
            artistId: artist.id,
            libraryId: library.id
        }

        await dispatch(deleteLibraryArtist(payload))
        setTrigger(prev => !prev)
        window.alert("Artist removed from library")
    }

    const checkArtistInLibrary = (artist) => {
        let inLibrary = false;
        libraryArtists?.forEach(libraryArtist => {
            if (libraryArtist?.artistId === artist?.id && libraryArtist?.libraryId === library?.id) {
                return inLibrary = true;
            }
        })
        return inLibrary;
    }

    return (
        <div id='artist-info__container'>
            <NavigationSide />
            <div id='artist-info__content'>
                <NavigationTop />
                <div id='artist-info__header'>
                    { artist?.imgUrl ? (<img src={artist?.imgUrl} alt='artist'/>) : (<img src={image} alt='artist'/>)}
                    <div id='artist-info__info'>
                        <div id='artist-info__sub'>
                            {'ARTIST'}
                            {sessionUser
                                ? ((!checkArtistInLibrary(artist)
                                    ? (<AiOutlineHeart id='artist-info__heart' onClick={() => addArtistToLibrary(artist)}/>)
                                    : (<AiFillHeart id='artist-info__heart' onClick={() => removeArtistFromLibrary(artist)}/>)))
                                : (<></>)}
                        </div>
                        <div id='artist-info__name'>{artist?.name}</div>
                        <div id='artist-info__sub'>{artist?.description}</div>
                    </div>
                </div>
                <div id='album__header'>Albums</div>
                <div id='album__container'>
                    <div id='album__content'>
                        {console.log('-------> ARTISTALBUMS', artistAlbums)}
                        {artistAlbums?.map(album => (
                            <NavLink to={`/album/${album.id}`}>
                                <div id='album__card'>
                                    <img src={album?.imgUrl} alt='album'/>
                                    <div id='album__name'>{album.name}</div>
                                    {album.year}
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
