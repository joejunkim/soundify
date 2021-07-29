import React from 'react';
import { useSelector } from 'react-redux';

function NavigationSide() {
    const sessionUser = useSelector(state => state.session.user);
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

    return (
        <div id='library__container'>
            <div id='library__nav'>
                <NavLink to='/home' >
                    Soundify
                </NavLink>
                <NavLink to='/home' >
                    Home
                </NavLink>
                <NavLink to='/search' >
                    Search
                </NavLink>
                <NavLink to='/library/collection/playlists' >
                    Your Library
                </NavLink>
                <button>
                    <CreatePlaylistModal />
                </button>
                {myPlaylists?.map(playlist => (
                    <NavLink to={`/playlist/${playlist.id}`}>
                        {playlist.title}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
