import { csrfFetch } from "./csrf.js";

export const LOAD_PLAYLISTSONGS = "playlistsongs/LOAD_PLAYLISTSONG";
export const ADD_PLAYLISTSONG = "playlistsongs/ADD_PLAYLISTSONG";
export const REMOVE_PLAYLISTSONG = "playlistsongs/REMOVE_PLAYLISTSONG"

const loadPlaylistSongs = (playlistSongs) => ({
    type: LOAD_PLAYLISTSONGS,
    playlistSongs
})

const addPlaylistSong = (playlistSong) => ({
    type: ADD_PLAYLISTSONG,
    playlistSong
})

const removePlaylistSong = (playlistSong) => ({
    type: REMOVE_PLAYLISTSONG,
    playlistSong
})

export const getPlaylistSongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songstoplaylists`)

    if (res.ok) {
        const playlistSongs = await res.json();
        dispatch(loadPlaylistSongs(playlistSongs));
    }
}

export const createPlaylistSong = (data) => async dispatch => {
    const res = await csrfFetch('/api/songstoplaylists',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })

    if (res.ok) {
        const playlistSong = await res.json();
        dispatch(addPlaylistSong(playlistSong))
        return;
    }
}

export const deletePlaylistSong = (data) => async dispatch => {
    const response = await csrfFetch(`/api/songstoplaylists/`,
        { method: 'DELETE', body: JSON.stringify(data) });

    if (response.ok) {
        dispatch(removePlaylistSong());
    }
}

const initialState = {};
let newState = {};

const playlistSongReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PLAYLISTSONGS:
            const allPlaylistSongs = {};
            let count = 1;
            action.playlistSongs.forEach((song) => {
                allPlaylistSongs[count] = song;
                count++
            })
            return {
                ...state,
                ...allPlaylistSongs,
            }
        case ADD_PLAYLISTSONG:
            newState = {
                ...state,
            };
            return { ...newState };
        case REMOVE_PLAYLISTSONG:
            newState = { ...state }
            delete newState[action.playlistSong]
            return { ...newState }
        default:
            return state;
    }
}

export default playlistSongReducer;
