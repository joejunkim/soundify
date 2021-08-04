import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import { getPlayLists } from '../../store/playlist';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import { getLibrarySongs, createLibrarySong, deleteLibrarySong } from '../../store/songtolibrary'
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import { MusicPlayerContext } from '../../context/MusicPlayer'

import { BiSearch } from "react-icons/bi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"

import './SearchPage.css'

function SearchPage() {
    const [searchValue, setSearchValue] = useState('')

    const { setType, setSource } = useContext(MusicPlayerContext)

    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])
    const playlists = useSelector((state) => Object.values(state.playlists))
    const artists = useSelector((state) => Object.values(state.artists))
    const albums = useSelector((state) => Object.values(state.albums))
    const songs = useSelector((state) => Object.values(state.songs))
    const librarySongs = useSelector((state) => Object.values(state.librarySongs))

    let searchPlaylists;
    let searchArtists;
    let searchAlbums;
    let searchSongs;

    if (searchValue) {
        searchPlaylists = playlists?.filter(playlist => (playlist.name.toLowerCase().includes(searchValue.toLowerCase())))
        searchArtists = artists?.filter(artist => (artist.name.toLowerCase().includes(searchValue.toLowerCase())))
        searchAlbums = albums?.filter(album => (album.name.toLowerCase().includes(searchValue.toLowerCase())))
        searchSongs = songs?.filter(song => (song.name.toLowerCase().includes(searchValue.toLowerCase())))
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

    const getAlbumArt = (song) => {
        return albums[song.albumId - 1]?.imgUrl
    }

    const getAlbumArtist = (song) => {
        return artists[albums[song.albumId - 1]?.artistId - 1]?.name
    }

    const getAlbumName = (song) => {
        return albums[song.albumId - 1]?.name
    }

    const checkInLibrary = (song) => {
        let inLibrary = false;
        librarySongs?.forEach(librarySong => {
            if (librarySong.songId === song.id && librarySong.libraryId === library.id) {
                return inLibrary = true;
            }
        })
        return inLibrary;
    }

    const addToLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        dispatch(createLibrarySong(payload))
        window.alert("Song added to your library")
        window.location.reload()
    }

    const removeFromLibrary = (song) => {
        const payload = {
            songId: song.id,
            libraryId: library.id
        }

        dispatch(deleteLibrarySong(payload))
        window.alert("Song removed from your library")
        window.location.reload()
    }

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getArtists())
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getLibrarySongs())
    }, [dispatch]);

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
                            <NavLink to={`/playlist/${playlist.id}`}>
                                <div id='search__card'>
                                        <img alt='playlist image'/>
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
                        {searchArtists?.map(artist => (
                            <NavLink to={`/artist/${artist.id}`}>
                                <div id='search__card'>
                                    <img src={artist?.imgUrl} alt='artist image'/>
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
                            <NavLink to={`/album/${album.id}`}>
                                <div id='search__card'>
                                    <img src={album?.imgUrl} alt='album cover'/>
                                    <div id='search__card-name'>{album.name}</div>
                                    <div id='search__card-info'>{album.artistName}</div>
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
                                <img src={getAlbumArt(song)} alt='album'></img>
                                <div id='search-song__info' onClick={() => playSong(song)}>
                                    <div id='search-song__name'>{song.name}</div>
                                    <div id='search-song__sub'>{getAlbumArtist(song)} | {getAlbumName(song)}</div>
                                </div>
                                {!checkInLibrary(song)
                                    ? (<AiOutlineHeart onClick={() => addToLibrary(song)}/>)
                                    : (<AiFillHeart onClick={() => removeFromLibrary(song)}/>)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchPage;
