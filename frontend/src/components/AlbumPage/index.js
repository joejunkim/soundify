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

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

import './AlbumPage.css';

function AlbumPage() {
    const { id } = useParams();
    const { setType, setSource } = useContext(MusicPlayerContext)

    const [ trigger, setTrigger ] = useState(false)

    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const album = useSelector((state) => state.albums[id])
    const libraryAlbums = useSelector((state) => Object.values(state.libraryAlbums))
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
        song.albumId === parseInt(id)
    ))

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getLibraryAlbums())
        dispatch(getLibrarySongs())
    }, [dispatch, trigger]);

    const addSongToLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        dispatch(createLibrarySong(payload))
        setTrigger(prev => !prev)
        window.alert("Song added to library")
    }

    const removeSongFromLibrary = async(song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        await dispatch(deleteLibrarySong(payload))
        setTrigger((prev) => !prev)
        window.alert("Song removed from library")
    }

    const addSongToPlaylist = (song, playlistStr) => {
        const playlistId = parseInt(playlistStr)

        const payload = {
            songId: song.id,
            playlistId
        }

        dispatch(createPlaylistSong(payload))
        setTrigger(prev => !prev)
        window.alert("Song added to playlist")
    }

    const addAlbumToLibrary = async(album) => {
        const payload = {
            albumId: album.id,
            libraryId: library.id
        }

        await dispatch(createLibraryAlbum(payload))
        setTrigger(prev => !prev)
        window.alert("Album added to library")
    }

    const removeAlbumFromLibrary = async(album) => {
        const payload = {
            albumId: album.id,
            libraryId: library.id
        }

        await dispatch(deleteLibraryAlbum(payload))
        setTrigger(prev => !prev)
        window.alert("Album removed from library")
    }

    const checkSongInLibrary = (song) => {
        let inLibrary = false;
        librarySongs?.forEach(librarySong => {
            if (librarySong?.songId === song?.id && librarySong?.libraryId === library?.id) {
                return inLibrary = true;
            }
        })
        return inLibrary;
    }

    const checkAlbumInLibrary = (album) => {
        let inLibrary = false;
        libraryAlbums?.forEach(libraryAlbum => {
            if (libraryAlbum?.albumId === album?.id && libraryAlbum?.libraryId === library?.id) {
                return inLibrary = true;
            }
        })
        return inLibrary;
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
                        <div id='album-info__sub'>
                            <div>{'ALBUM'}</div>
                            {sessionUser
                                ? ((!checkAlbumInLibrary(album)
                                    ? (<AiOutlineHeart id='album-info__heart' onClick={() => addAlbumToLibrary(album)}/>)
                                    : (<AiFillHeart id='album-info__heart' onClick={() => removeAlbumFromLibrary(album)}/>)))
                                : (<></>)}
                        </div>
                        <div id='album-info__name'>{album?.name}</div>
                        <div id='album-info__sub'>{album?.year} | {albumSongs.length} Tracks</div>
                    </div>
                </div>
                <div id='song__header'>Tracks</div>
                <div id='song__container'>
                    <div id='song__content'>
                        {albumSongs?.map((song, i) => (
                            <div key={song.id} id='song__bar'>
                                <div id='song__info' onClick={() => playSong(song)}>
                                    <div id='song__id'>{i + 1}</div>
                                    <div id='song__name'>{song?.name}</div>
                                </div>
                                {sessionUser
                                    ? (<select id='song__playlist' onChange={(e) => addSongToPlaylist(song, e.target.value)}>
                                        <option value="">--Add To Playlist--</option>
                                        {myPlaylists?.map(playlist => (
                                            <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                                        ))}
                                </select>)
                                    : (<></>)}
                                {sessionUser
                                    ? ((!checkSongInLibrary(song)
                                        ? (<AiOutlineHeart id='song-info__heart' onClick={() => addSongToLibrary(song)}/>)
                                        : (<AiFillHeart id='song-info__heart' onClick={() => removeSongFromLibrary(song)}/>)))
                                    : (<></>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AlbumPage;
