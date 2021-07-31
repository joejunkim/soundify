import { csrfFetch } from "./csrf.js";

export const LOAD_LIBSONGS = "librarysongs/LOAD_LIBSONGS";
export const ADD_LIBSONG = "librarysongs/ADD_LIBSONG";
export const REMOVE_LIBSONG = "librarysongs/REMOVE_LIBSONG"

const loadLibSongs = (libSongs) => ({
    type: LOAD_LIBSONGS,
    libSongs
})

const addLibSong = (libSong) => ({
    type: ADD_LIBSONG,
    libSong
})

const removeLibSong = (libSong) => ({
    type: REMOVE_LIBSONG,
    libSong
})

export const getLibSongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songstolibraries`)

    if (res.ok) {
        const libSongs = await res.json();
        dispatch(loadLibSongs(libSongs));
    }
}

export const createLibSong = (data) => async dispatch => {
    const res = await csrfFetch('/api/songstolibraries',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })

    if (res.ok) {
        const libSong = await res.json();
        dispatch(addLibSong(libSong))
        return;
    }
}

export const deleteLibSong = (data) => async dispatch => {
    const response = await csrfFetch(`/api/songstolibraries/`,
        { method: 'DELETE', body: JSON.stringify(data) });

    if (response.ok) {
        dispatch(removeLibSong());
    }
}

const initialState = {};
let newState = {};

const librarySongReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIBSONGS:
            const allLibSongs = {};
            let count = 1;
            action.libSongs.forEach((song) => {
                allLibSongs[count] = song;
                count++
            })
            return {
                ...state,
                ...allLibSongs,
            }
        case ADD_LIBSONG:
            newState = {
                ...state,
                // [action.libSong.id]: action.libSong
            };
            return { ...newState };
        case REMOVE_LIBSONG:
            newState = { ...state }
            delete newState[action.libSong]
            return { ...newState }
        default:
            return state;
    }
}

export default librarySongReducer;
