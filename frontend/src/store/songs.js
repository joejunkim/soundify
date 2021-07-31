import { csrfFetch } from "./csrf.js";

export const LOAD_SONGS = "songs/LOAD_SONGS";

const loadSongs = (songs) => ({
    type: LOAD_SONGS,
    songs
})

export const getSongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songs`)

    if (res.ok) {
        const songs = await res.json();
        dispatch(loadSongs(songs));
    }
}

const initialState = {};

const songsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SONGS:
            const allSongs = {};
            action.songs.forEach((song) => {
                allSongs[song.id] = song;
            })
            return {
                ...state,
                ...allSongs,
            }
        default:
            return state;
    }
}

export default songsReducer;
