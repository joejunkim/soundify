import { csrfFetch } from "./csrf.js";

export const LOAD_librarySongs = "librarysongs/LOAD_librarySongs";
export const ADD_librarySong = "librarysongs/ADD_librarySong";
export const REMOVE_librarySong = "librarysongs/REMOVE_librarySong"

const loadlibrarySongs = (librarySongs) => ({
    type: LOAD_librarySongs,
    librarySongs
})

const addlibrarySong = (librarySong) => ({
    type: ADD_librarySong,
    librarySong
})

const removelibrarySong = (librarySong) => ({
    type: REMOVE_librarySong,
    librarySong
})

export const getlibrarySongs = () => async dispatch => {
    const res = await csrfFetch(`/api/songstolibraries`)

    if (res.ok) {
        const librarySongs = await res.json();
        dispatch(loadlibrarySongs(librarySongs));
    }
}

export const createlibrarySong = (data) => async dispatch => {
    const res = await csrfFetch('/api/songstolibraries',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })

    if (res.ok) {
        const librarySong = await res.json();
        dispatch(addlibrarySong(librarySong))
        return;
    }
}

export const deletelibrarySong = (data) => async dispatch => {
    const response = await csrfFetch(`/api/songstolibraries/`,
        { method: 'DELETE', body: JSON.stringify(data) });

    if (response.ok) {
        dispatch(removelibrarySong());
    }
}

const initialState = {};
let newState = {};

const librarySongReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_librarySongs:
            const alllibrarySongs = {};
            let count = 1;
            action.librarySongs.forEach((song) => {
                alllibrarySongs[count] = song;
                count++
            })
            return {
                ...state,
                ...alllibrarySongs,
            }
        case ADD_librarySong:
            newState = {
                ...state,
            };
            return { ...newState };
        case REMOVE_librarySong:
            newState = { ...state }
            delete newState[action.librarySong]
            return { ...newState }
        default:
            return state;
    }
}

export default librarySongReducer;
