import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from 'react-router-dom';
import { getLibraries } from '../../store/library';
import { getPlayLists } from '../../store/playlist';
import NavigationTop from '../NavigationTop'
import NavigationSide from '../NavigationSide'
import './LibraryPage.css';

function LibraryPage() {
    const { type } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const library = useSelector((state) => state.libraries[sessionUser?.id])

    const playlists = useSelector((state) => Object.values(state.playlists))
    let myPlaylists;
    if (sessionUser) {
        myPlaylists = playlists.filter(playlist => (
            playlist.libraryId === library?.id
        ))
    }

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLibraries())
        dispatch(getPlayLists())
    }, [dispatch])

    let collection;
    if ( type === 'playlists') { collection = (
        <>
            <div id='collection__title'>
                {type[0].toUpperCase() + type.slice(1)}
            </div>
            <div id='playlist__container'>
                {myPlaylists?.map(playlist => (
                    <NavLink to={`/playlist/${playlist.id}`}>
                        <div id='playlist__card'>
                            <div id='playlist__img'>
                                {playlist.imgUrl}
                            </div>
                            <div id='playlist__title'>
                                {playlist.title}
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    )
    } else if ( type === 'songs') { collection = ( <>songs</> )
    } else if ( type === 'artists') { collection = ( <>artists</>)
    } else if ( type === 'albums') { collection = ( <>albums</> )
    }

    return (
        <div id='library__container'>
            <NavigationSide />
            <div id='library__content'>
                <NavigationTop />
                {collection}
            </div>
        </div>
    )
}

export default LibraryPage;
