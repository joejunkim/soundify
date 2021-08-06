import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists'
import { getAlbums } from '../../store/albums'
import { getSongs } from '../../store/songs'
import { getLibrarySongs, createLibrarySong, deleteLibrarySong } from '../../store/songtolibrary'
import { getPlaylistSongs, deletePlaylistSong } from '../../store/songtoplaylist';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import EditPlaylistModal from '../EditPlaylistModal'
import DeletePlaylistModal from '../DeletePlaylistModal'

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BiTrash } from "react-icons/bi"

import default_pic from './default.png'
import './PlaylistPage.css';

function PlaylistPage() {
    const { id } = useParams();
    const { setType, setSource } = useContext(MusicPlayerContext)

    const [ trigger, setTrigger ] = useState(false)

    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const playlist = useSelector((state) => state.playlists[id])
    const artists = useSelector((state) => (state.artists))
    const albums = useSelector((state) => (state.albums))
    const songs = useSelector((state) => (state.songs))

    const dispatch = useDispatch();

    const playlistSongs = useSelector((state) => Object.values(state.playlistSongs))
    const librarySongs = useSelector((state) => Object.values(state.librarySongs))

    let mySongs = [];
    const filteredSongs = playlistSongs.filter(playlistSong => (
        playlistSong.playlistId === playlist?.id
    ))

    filteredSongs.forEach(playlistSong => {
        mySongs.push(songs[playlistSong.songId])
    })

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getPlaylistSongs())
        dispatch(getLibrarySongs())
    }, [dispatch, trigger]);

    const getAlbumArt = (song) => albums[song?.albumId]?.imgUrl
    const getArtistNameSong = (song) => artists[albums[song?.albumId]?.artistId]?.name
    const getAlbumName = (song) => albums[song?.albumId]?.name

    const removeFromPlaylist = (song) => {
        const payload = {
            songId: song.id,
            playlistId: playlist.id
        }

        dispatch(deletePlaylistSong(payload))
        setTrigger(prev => !prev)
        window.alert('Song removed from playlist')
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

    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    return (
        <div id='playlist-info__container'>
            <NavigationSide />
            <div id='playlist-info__content'>
                <NavigationTop />
                <div id='playlist-info__header'>
                    { playlist?.image
                            ? (<img src={playlist?.image} alt='playlist'/>)
                            : (<img src={default_pic} alt='playlist'/>)}
                    <div id='playlist-info__info'>
                        <div id='playlist-info__sub'>{'PLAYLIST'}</div>
                        <div id='playlist-info__name'>{playlist?.name}</div>
                        <div id='playlist-info__sub'>{playlist?.description}</div>
                    </div>
                </div>
                <div id='playlist-info__edit'>
                    { sessionUser?.id === playlist?.libraryId
                        ? (<><div><EditPlaylistModal playlist={playlist} setTrigger={setTrigger}/></div>
                            <div><DeletePlaylistModal mySongs={mySongs} setTrigger={setTrigger}/></div></>)
                        : (<></>)}
                </div>
                <div id='playlist-song__main'>
                    <div id='playlist-song__header'>Tracks</div>
                        {mySongs
                            ? (mySongs.length === 1
                                ? (<div className='playlist-song__count'>1 track</div>)
                                : (<div className='playlist-song__count'>{mySongs?.length} tracks</div>))
                                : (<div>0 tracks</div>)}
                </div>
                <div id='playlist-song__container'>
                    <div id='playlist-song__content'>
                        {mySongs?.map((song, i) => (
                            <div key={song?.id} id='playlist-song__bar'>
                                <div id='playlist-song__click' onClick={() => playSong(song)}>
                                    <div id='playlist-song__id'>{i + 1}</div>
                                    <img src={getAlbumArt(song)} alt='album'/>
                                    <div id='playlist-song__info'>
                                        <div id='playlist-song__name'>{song?.name}</div>
                                        <div id='playlist-song__sub'>{getArtistNameSong(song)} | {getAlbumName(song)}</div>
                                    </div>
                                </div>
                                { sessionUser?.id === playlist?.libraryId
                                    ? (<BiTrash id='playlist-song__trash' onClick={() => removeFromPlaylist(song)}/>)
                                    : (<></>)}
                                {(!checkSongInLibrary(song)
                                        ? (<AiOutlineHeart id='playlist-song__heart' onClick={() => addSongToLibrary(song)}/>)
                                        : (<AiFillHeart id='playlist-song__heart' onClick={() => removeSongFromLibrary(song)}/>))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;
