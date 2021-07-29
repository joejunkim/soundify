import { csrfFetch } from "./csrf.js";

export const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
export const ADD_PLAYLIST = "playlists/ADD_PLAYLIST"

const loadPlaylists = (playlists) => ({
    type: LOAD_PLAYLISTS,
    playlists
})

const addPlaylist = (playlist) => ({
    type: ADD_PLAYLIST,
    playlist
})

export const getPlayLists = () => async dispatch => {
    const res = await csrfFetch(`/api/playlists`)

    if (res.ok) {
        const playlists = await res.json();
        dispatch(loadPlaylists(playlists));
    }
}

export const createPlaylist = (data) => async dispatch => {
    const res = await csrfFetch('/api/playlists/',
    {
        method: 'POST',
        body: JSON.stringify(data)
    })

    if (res.ok) {
        const playlist = await res.json();
        dispatch(addPlaylist(playlist))
        return;
    }
}

const initialState = {};

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PLAYLISTS:
            const allPlaylists = {};
            action.playlists.forEach((playlist) => {
                allPlaylists[playlist.id] = playlist;
            })
            return {
                ...state,
                ...allPlaylists,
            }
        case ADD_PLAYLIST:
            const newState = {
                ...state,
                [action.playlist.id]: action.playlist
            };
            return { ...newState };
        default:
            return state;
    }
}

export default playlistsReducer;
