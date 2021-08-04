import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import { getSongs } from '../../store/songs'
import { getLibrarySongs, deleteLibrarySong } from '../../store/songtolibrary';
import { getLibraryAlbums, deleteLibraryAlbum } from '../../store/albumtolibrary'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import { BiTrash } from "react-icons/bi"
import image from './default_playlist.png'
import './LibraryPage.css';

function LibraryPage() {
    const { library, type } = useParams();
    const { setType, setSource } = useContext(MusicPlayerContext)
    const sessionUser = useSelector((state) => state.session.user);
    const myLibrary = useSelector((state) => state.libraries[sessionUser?.id])
    const artists = useSelector((state) => (state.artists))
    const albums = useSelector((state) => (state.albums))
    const songs = useSelector((state) => (state.songs))

    const dispatch = useDispatch();

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
                playlist.libraryId === myLibrary?.id
            ))
        }

    const libraryArtists = useSelector((state) => Object.values(state.libraryArtists))
    let myArtists = [];
    const filteredArtists = libraryArtists?.filter(artist => (
        artist.libraryId === myLibrary?.id
    ))
    filteredArtists.forEach(artist => {
        myArtists.push(artists[artist.artistId])
    })

    const libraryAlbums = useSelector((state) => Object.values(state.libraryAlbums))
    let myAlbums = [];
    const filteredAlbums = libraryAlbums?.filter(album => (
        album.libraryId === myLibrary?.id
    ))
    filteredAlbums.forEach(album => {
        myAlbums.push(albums[album.albumId])
    })

    const librarySongs = useSelector((state) => Object.values(state.librarySongs))
    let mySongs = [];
    const filteredSongs = librarySongs?.filter(song => (
        song.libraryId === myLibrary?.id
    ))
    filteredSongs.forEach(song => {
        mySongs.push(songs[song.songId])
    })

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
        dispatch(getSongs())
        dispatch(getLibrarySongs())
        dispatch(getLibraryAlbums())
    }, [dispatch])

    const removeFromLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: sessionUser.id
        }

        dispatch(deleteLibrarySong(payload))
        window.location.reload()
    }

    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    let collection;
    if ( type === 'playlists') {
        collection = (
            <>
                <div id='collection__name'>Playlists</div>
                {myPlaylists
                    ? (myPlaylists.length === 1
                        ? (<div>1 playlist</div>)
                        : (<div>{myPlaylists?.length} playlists</div>))
                    : (<div>0 playlists</div>)}
                <div id='playlist__container'>
                    {myPlaylists?.map(playlist => (
                        <NavLink to={`/playlist/${playlist.id}`}>
                            <div id='playlist__card'>
                                <img src={image} alt='playlist image'/>
                                <div id='playlist__name'>{playlist.name}</div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </>)
    } else if ( type === 'artists') {
        collection = (
            <>
                <div id='collection__name'>Artists</div>
                {myArtists
                    ? (myArtists.length === 1
                        ? (<div>1 artist</div>)
                        : (<div>{myArtists?.length} artists</div>))
                    : (<div>0 artists</div>)}
                <div className='artist-content'>
                    {myArtists?.map(artist => (
                        <NavLink to={`/artist/${artist.id}`}>
                            <div id='playlist__card'>
                                <img src={artist?.imgUrl} alt='artist'/>
                                {artist.name}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </> )
    } else if ( type === 'albums') {
        collection = (
            <>
                <div id='collection__name'>Albums</div>
                {myAlbums
                    ? (myAlbums.length === 1
                        ? (<div>1 album</div>)
                        : (<div>{myAlbums?.length} albums</div>))
                    : (<div>0 albums</div>)}
                <div className='artist-content'>
                    {myAlbums?.map(album => (
                        <NavLink to={`/album/${album.id}`}>
                            <div id='playlist__card'>
                                <img src={album?.imgUrl} alt='album'/>
                                {album.name}
                            </div>
                        </NavLink>
                    ))}
                </div>
            </> )
    } else if ( type === 'songs') {
        collection = (
            <>
                <div id='collection__name'>Tracks</div>
                {mySongs
                    ? (mySongs.length === 1
                        ? (<div>1 track</div>)
                        : (<div>{mySongs?.length} tracks</div>))
                    : (<div>0 tracks</div>)}
                <div id='song-content'>
                    {mySongs?.map((song, i) => (
                        <div key={song?.id} id='song__bar' onClick={() => playSong(song)}>
                            <div id='song__id'>{i + 1}</div>
                            <div id='song__name'>{song?.name}</div>
                            <button type='click' onClick={() => removeFromLibrary(song)}><BiTrash /></button>
                        </div>
                    ))}
                </div>
            </>)
    }

    return (
        <div id='library__container'>
            <NavigationSide library={library}/>
            <div id='library__content'>
                <NavigationTop />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
