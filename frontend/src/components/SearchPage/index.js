import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getLibraries} from '../../store/library'
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import { getLibrarySongs, createLibrarySong, deleteLibrarySong } from '../../store/songtolibrary'
import { createPlaylistSong } from '../../store/songtoplaylist'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import { BiSearch } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import default_pic from './default.png'
import './SearchPage.css'

function SearchPage() {
    const [searchValue, setSearchValue] = useState('')
    const [trigger, setTrigger] = useState(false)

    const { setType, setSource } = useContext(MusicPlayerContext)

    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const playlists = useSelector((state) => Object.values(state.playlists))
    const artists = useSelector((state) => Object.values(state.artists))
    const albums = useSelector((state) => Object.values(state.albums))
    const songs = useSelector((state) => Object.values(state.songs))
    const librarySongs = useSelector((state) => Object.values(state.librarySongs))

    const orderedArtists = useSelector((state) => Object.values(state.artists))
    const orderedAlbums = useSelector((state) => Object.values(state.albums))

    playlists.sort((a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)
    artists.sort((a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)
    albums.sort((a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)
    songs.sort((a, b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)

    let searchPlaylists = [];
    let searchArtists = [];
    let searchAlbums = [];
    let searchSongs = [];

    if (searchValue) {
        searchPlaylists = playlists?.filter(playlist => (playlist?.name?.toLowerCase().includes(searchValue.toLowerCase())))
        searchArtists = artists?.filter(artist => (artist?.name?.toLowerCase().includes(searchValue.toLowerCase())))
        searchAlbums = albums?.filter(album => (album?.name?.toLowerCase().includes(searchValue.toLowerCase())))
        searchSongs = songs?.filter(song => (song?.name?.toLowerCase().includes(searchValue.toLowerCase())))
    }

    const dispatch = useDispatch();

    const searchNav = (
        <div id='search__input'>
            <BiSearch />
            <input onChange={(e) => setSearchValue(e.target.value)} placeholder="Search by playlist, artist, album, or track" />
        </div>
    )

    const playSong = (song) => {
        setType('track')
        setSource(song.source)
    }

    const getAlbumArt = (song) => orderedAlbums[song.albumId - 1]?.imgUrl
    const getArtistNameAlbum = (album) => orderedArtists[album.artistId - 1]?.name
    const getArtistNameSong = (song) => orderedArtists[orderedAlbums[song.albumId - 1]?.artistId - 1]?.name
    const getAlbumName = (song) => orderedAlbums[song.albumId - 1]?.name

    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
            playlist.libraryId === library?.id
            ))
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

    const checkInLibrary = (song) => {
        let inLibrary = false;
        librarySongs?.forEach(librarySong => {
            if (librarySong?.songId === song?.id && librarySong?.libraryId === library?.id) {
                return inLibrary = true;
            }
        })
        return inLibrary;
    }

    const addToLibrary = async(song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        await dispatch(createLibrarySong(payload))
        setTrigger((prev) => !prev)
        window.alert("Song added to library")
    }

    const removeFromLibrary = async(song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        await dispatch(deleteLibrarySong(payload))
        setTrigger((prev) => !prev)
        window.alert("Song removed from library")
    }

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getLibrarySongs())
    }, [dispatch, trigger]);

    return (
        <div id='search__container'>
            <NavigationSide />
            <div id='search__content'>
                <NavigationTop searchNav={searchNav}/>
                <div id='search__content-results'>
                    <div className='search__header'>Playlists</div>
                    {searchPlaylists
                        ? (searchPlaylists.length === 1
                            ? (<div>1 result</div>)
                            : (<div>{searchPlaylists?.length} results</div>))
                        : (<div>0 results</div>)}
                    <div className='search__results'>
                        {searchPlaylists?.map(playlist => (
                            <NavLink key={playlist.id} to={`/playlist/${playlist.id}`}>
                                <div id='search__card'>
                                        { playlist?.image
                                            ? (<img src={playlist?.image} alt='playlist'/>)
                                            : (<img src={default_pic} alt='playlist'/>)}
                                        {playlist.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='search__header'>Artists</div>
                    {searchArtists
                        ? (searchArtists.length === 1
                            ? (<div>1 result</div>)
                            : (<div>{searchArtists?.length} results</div>))
                        : (<div>0 results</div>)}
                    <div className='search__results'>
                        {searchArtists?.sort().map(artist => (
                            <NavLink key={artist.id} to={`/artist/${artist.id}`}>
                                <div id='search__card'>
                                    <img src={artist?.imgUrl} alt='artist'/>
                                    {artist.name}
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='search__header'>Albums</div>
                    {searchAlbums
                        ? (searchAlbums.length === 1
                            ? (<div>1 result</div>)
                            : (<div>{searchAlbums?.length} results</div>))
                        : (<div>0 results</div>)}
                    <div className='search__results'>
                        {searchAlbums?.map(album => (
                            <NavLink key={album.id} to={`/album/${album.id}`}>
                                <div id='search__card'>
                                    <img src={album?.imgUrl} alt='album'/>
                                    <div id='search__card-name'>{album.name}</div>
                                    <div id='search__card-info'>{getArtistNameAlbum(album)}</div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                    <div className='search__header'>Tracks</div>
                    {searchSongs
                        ? (searchSongs.length === 1
                            ? (<div>1 result</div>)
                            : (<div>{searchSongs?.length} results</div>))
                        : (<div>0 results</div>)}
                    <div className='search__results-songs'>
                        {searchSongs?.map(song => (
                            <div key={song.id} id='search-song__bar'>
                                <img src={getAlbumArt(song)} alt='album'/>
                                <div id='search-song__info' onClick={() => playSong(song)}>
                                    <div id='search-song__name'>{song.name}</div>
                                    <div id='search-song__sub'>{getArtistNameSong(song)} | {getAlbumName(song)}</div>
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
                                    ? ((!checkInLibrary(song)
                                        ? (<AiOutlineHeart id='song__heart' onClick={() => addToLibrary(song)}/>)
                                        : (<AiFillHeart id='song__heart' onClick={() => removeFromLibrary(song)}/>)))
                                    : (<></>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;
