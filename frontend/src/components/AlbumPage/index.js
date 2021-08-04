import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAlbums } from '../../store/albums'
import { getSongs } from '../../store/songs'
import { getLibrarySongs, createLibrarySong, deleteLibrarySong } from '../../store/songtolibrary'
import { getLibraryAlbums, createLibraryAlbum, deleteLibraryAlbum } from '../../store/albumtolibrary';
import { createPlaylistSong } from '../../store/songtoplaylist'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import { AiOutlineHeart } from "react-icons/ai"
import { MdPlaylistAdd } from "react-icons/md"

import './AlbumPage.css';

function AlbumPage() {
    const { id } = useParams();
    const { setType, setSource } = useContext(MusicPlayerContext)

    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const album = useSelector((state) => state.albums[id])
    const librarySongs = useSelector((state) => Object.values(state.librarySongs))

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
            playlist.libraryId === library?.id
            ))
        }

    const songs = useSelector((state) => Object.values(state.songs))
    const albumSongs = songs?.filter(song => (
        song.albumId == id
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getLibraryAlbums())
        dispatch(getLibrarySongs())
    }, [dispatch, createLibrarySong]);

    const addSongToLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        dispatch(createLibrarySong(payload))
        window.alert("Song added to your library")
    }

    const addSongToPlaylist = (song, playlistStr) => {
        const playlistId = parseInt(playlistStr)

        const payload = {
            songId: song.id,
            playlistId
        }

        dispatch(createPlaylistSong(payload))
        window.alert("Song added to your playlist")
    }

    const addAlbumToLibrary = (album) => {
        const payload = {
            albumId: album.id,
            libraryId: library.id
        }

        dispatch(createLibraryAlbum(payload))
        window.alert("Album added to your library")
    }

    const checkInLibrary = (song) => {
        librarySongs.forEach(librarySong => {
            if (librarySong.songId === song.id && librarySong.libraryId === id) {
                return (<AiOutlineHeart id='song__library' onClick={() => addSongToLibrary(song)}/>)
            } else {
                return (<MdPlaylistAdd id='song_library'/>)
            }
        })
    }
    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    return (
        <div id='album-info__container'>
            <NavigationSide />
            <div id='album-info__content'>
                <NavigationTop />
                <div id='album-info__header'>
                    <img src={album?.imgUrl} alt='album'/>
                    <div id='album-info__info'>
                        <div id='album-info__sub'>{'ALBUM'}</div>
                        <div id='album-info__name'>{album?.name}</div>
                        <div id='album-info__sub'>{album?.year}</div>
                        <div onClick={() => addAlbumToLibrary(album)}>ADD ME TO LIBRARY</div>
                    </div>
                </div>
                <div id='song__header'>Tracks</div>
                <div id='song__container'>
                    <div id='song__content'>
                        {albumSongs?.map((song, i) => (
                            <div key={song.id} id='song__bar' onClick={() => playSong(song)}>
                                <div id='song__id'>{i + 1}</div>
                                <div id='song__name'>{song?.name}</div>
                                <select id='song__playlist' onChange={(e) => addSongToPlaylist(song, e.target.value)}>
                                    <option value=""><MdPlaylistAdd /></option>
                                    {myPlaylists?.map(playlist => (
                                        <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                                    ))}
                                </select>
                                {checkInLibrary(song)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;
