import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists'
import { getAlbums } from '../../store/albums'
import { getSongs } from '../../store/songs'
import { getLibrarySongs, deleteLibrarySong } from '../../store/songtolibrary';
import { getLibraryArtists } from '../../store/artisttolibrary'
import { getLibraryAlbums } from '../../store/albumtolibrary'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'

import { AiFillHeart } from "react-icons/ai"
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
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getLibraryArtists())
        dispatch(getLibraryAlbums())
        dispatch(getLibrarySongs())
    }, [dispatch])

    const removeFromLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: sessionUser.id
        }

        dispatch(deleteLibrarySong(payload))
    }

    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    const getAlbumArt = (song) => albums[song.albumId]?.imgUrl
    const getArtistNameAlbum = (album) => artists[album.artistId]?.name
    const getArtistNameSong = (song) => artists[albums[song.albumId]?.artistId - 1]?.name
    const getAlbumName = (song) => albums[song.albumId - 1]?.name

    let collection;
    if ( type === 'playlists') {
        collection = (
            <>
                <div className='collection__info'>
                    <div className='collection__name'>Playlists</div>
                    {myPlaylists
                        ? (myPlaylists.length === 1
                            ? (<div className='collection__count'>1 playlist</div>)
                            : (<div className='collection__count'>{myPlaylists?.length} playlists</div>))
                            : (<div>0 playlists</div>)}
                </div>
                <div className='library__content'>
                    {myPlaylists?.map(playlist => (
                        <NavLink to={`/playlist/${playlist.id}`}>
                            <div className='library__card'>
                                <img src={playlist.image} alt='playlist image'/>
                                <div id='playlist__name'>{playlist.name}</div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </>)
    } else if ( type === 'artists') {
        collection = (
            <>
                <div className='collection__info'>
                    <div className='collection__name'>Artists</div>
                    {myArtists
                        ? (myArtists.length === 1
                            ? (<div className='collection__count'>1 artist</div>)
                            : (<div className='collection__count'>{myArtists?.length} artists</div>))
                        : (<div>0 artists</div>)}
                </div>
                <div className='library__content'>
                    {myArtists?.map(artist => (
                        <NavLink to={`/artist/${artist?.id}`}>
                            <span className='library__card'>
                                <img src={artist?.imgUrl} alt='artist'/>
                                {artist?.name}
                            </span>
                        </NavLink>
                    ))}
                </div>
            </> )
    } else if ( type === 'albums') {
        collection = (
            <>
                <div className='collection__info'>
                    <div className='collection__name'>Albums</div>
                    {myAlbums
                        ? (myAlbums.length === 1
                            ? (<div className='collection__count'>1 album</div>)
                            : (<div className='collection__count'>{myAlbums?.length} albums</div>))
                        : (<div>0 albums</div>)}
                </div>
                <div className='library__content'>
                    {myAlbums?.map(album => (
                        <NavLink to={`/album/${album?.id}`}>
                            <div className='library__card'>
                                <img src={album?.imgUrl} alt='album'/>
                                <div id='library__card-name'>{album.name}</div>
                                <div id='library__card-info'>{getArtistNameAlbum(album)}</div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </> )
    } else if ( type === 'songs') {
        collection = (
            <>
                <div className='collection__info'>
                    <div className='collection__name'>Tracks</div>
                    {mySongs
                        ? (mySongs.length === 1
                            ? (<div className='collection__count'>1 track</div>)
                            : (<div className='collection__count'>{mySongs?.length} tracks</div>))
                        : (<div>0 tracks</div>)}
                </div>
                <div id='library__song-content'>
                    {mySongs?.map((song, i) => (
                        <div key={song?.id} id='song__bar' onClick={() => playSong(song)}>
                            <div id='song__id'>{i + 1}</div>
                            <img src={getAlbumArt(song)} alt='album'/>
                            <div id='song__name'>{song?.name}</div>
                            <button type='click' onClick={() => removeFromLibrary(song)}><AiFillHeart /></button>
                        </div>
                    ))}
                </div>
            </>)
    }

    return (
        <div id='library__container'>
            <NavigationSide library={library}/>
            <div id='library__results'>
                <NavigationTop />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
