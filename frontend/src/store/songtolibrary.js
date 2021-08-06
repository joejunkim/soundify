import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARYSONGS = "librarysongs/LOAD_LIBRARYSONGS";
export const ADD_LIBRARYSONG = "librarysongs/ADD_LIBRARYSONG";
export const REMOVE_LIBRARYSONG = "librarysongs/REMOVE_LIBRARYSONG"

const loadLibrarySongs = (librarySongs) => ({
    type: LOAD_LIBRARYSONGS,
    librarySongs
})

const addLibrarySong = (librarySong) => ({
    type: ADD_LIBRARYSONG,
    librarySong
})

const removeLibrarySong = (librarySong) => ({
    type: REMOVE_LIBRARYSONG,
    librarySong
})

export const getLibrarySongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songstolibraries`)

    if (res.ok) {
        const librarySongs = await res.json();
        dispatch(loadLibrarySongs(librarySongs));
        return;
    }
    return;
}

export const createLibrarySong = (data) => async dispatch => {
    const res = await csrfFetch('/api/songstolibraries',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })

    if (res.ok) {
        const librarySong = await res.json();
        dispatch(addLibrarySong(librarySong))
        return;
    }
    return;
}

export const deleteLibrarySong = (data) => async dispatch => {
    const res = await csrfFetch(`/api/songstolibraries/`,
        { method: 'DELETE', body: JSON.stringify(data) });


    if (res.ok) {
        const librarySong = await res.json();
        dispatch(removeLibrarySong(librarySong));
        return;
    }
    return;
}

const initialState = {};
let newState = {};

const librarySongReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIBRARYSONGS:
            const allLibrarySongs = {};
            let count = 1;
            action.librarySongs.forEach((song) => {
                allLibrarySongs[count] = song;
                count++
            })
            return {
                ...allLibrarySongs,
            }
        case ADD_LIBRARYSONG:
            newState = {
                ...state,
            };
            return { ...newState };
        case REMOVE_LIBRARYSONG:
            newState = { ...state }
            for (let key in newState) {
                let value = newState[key]
                if (value.libraryId === action.librarySong.libraryId && value.songId === action.librarySong.songId) {
                    delete newState[key]
                }
            }
            return { ...newState }
        default:
            return state;
    }
}

export default librarySongReducer;
