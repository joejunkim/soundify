import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPlayLists } from '../../store/playlist';
import { getSongs } from '../../store/songs'
import { getPlaylistSongs, deletePlaylistSong } from '../../store/songtoplaylist';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import EditPlaylistModal from '../EditPlaylistModal'
import DeletePlaylistModal from '../DeletePlaylistModal'
import image from './default_playlist.png'
import './PlaylistPage.css';

function PlaylistPage() {
    const { id } = useParams();
    const playlist = useSelector((state) => state.playlists[id])
    const songs = useSelector((state) => (state.songs))

    const dispatch = useDispatch();
    const reload = () => window.location.reload()

    const playlistSongs = useSelector((state) => Object.values(state.playlistSongs))

    let mySongs = [];
    const filteredSongs = playlistSongs.filter(playlistSong => (
        playlistSong.playlistId === playlist?.id
    ))

    filteredSongs.forEach(playlistSong => {
        mySongs.push(songs[playlistSong.songId])
    })

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getSongs())
        dispatch(getPlaylistSongs())
    }, [dispatch]);

    const removeFromPlaylist = (song) => {
        const payload = {
            songId: song.id,
            playlistId: playlist.id
        }

        dispatch(deletePlaylistSong(payload))
        window.location.reload()
    }

    return (
        <div id='playlist-info__container'>
            <NavigationSide />
            <div id='playlist-info__content'>
                <NavigationTop />
                <div id='playlist-info__header'>
                    <img src={image} alt='playlist image'/>
                    <div id='playlist-info__info'>
                        <div id='playlist-info__sub'>{'PLAYLIST'}</div>
                        <div id='playlist-info__name'>{playlist?.name}</div>
                        <div id='playlist-info__sub'>{playlist?.description}</div>
                    </div>
                </div>
                <div id='playlist-info__options'>
                    <div><EditPlaylistModal playlist={playlist} onExit={reload}/></div>
                    <div><DeletePlaylistModal mySongs={mySongs}/></div>
                </div>
                <div id='song-content'>
                    {mySongs?.map((song, i) => (
                        <div key={song?.id} id='song__bar'>
                            <div id='song__id'>{i + 1}</div>
                            <div id='song__name'>{song?.name}</div>
                            <button type='click' onClick={() => removeFromPlaylist(song)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PlaylistPage;
