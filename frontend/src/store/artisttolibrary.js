import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARYARTISTS = "libraryartists/LOAD_LIBRARYARTISTS";
export const ADD_LIBRARYARTIST = "libraryartists/ADD_LIBRARYARTIST";
export const REMOVE_LIBRARYARTIST = "libraryartists/REMOVE_LIBRARYARTIST"

const loadLibraryArtist = (libraryArtists) => ({
    type: LOAD_LIBRARYARTISTS,
    libraryArtists
})

const addLibraryArtist = (libraryArtist) => ({
    type: ADD_LIBRARYARTIST,
    libraryArtist
})

const removeLibraryArtist = (libraryArtist) => ({
    type: REMOVE_LIBRARYARTIST,
    libraryArtist
})

export const getLibraryArtists = () => async dispatch => {
    const res = await csrfFetch(`/api/artiststolibraries`)

    if (res.ok) {
        const libraryArtists = await res.json();
        dispatch(loadLibraryArtist(libraryArtists));
    }
}

export const createLibraryArtist = (data) => async dispatch => {
    const res = await csrfFetch('/api/artiststolibraries',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })

    if (res.ok) {
        const libraryArtist = await res.json();
        dispatch(addLibraryArtist(libraryArtist))
        return;
    }
}

export const deleteLibraryArtist = (data) => async dispatch => {
    const response = await csrfFetch(`/api/artiststolibraries/`,
        { method: 'DELETE', body: JSON.stringify(data) });

    if (response.ok) {
        dispatch(removeLibraryArtist());
    }
}

const initialState = {};
let newState = {};

const libraryArtistReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIBRARYARTISTS:
            const allLibraryArtists = {};
            let count = 1;
            action.libraryArtists.forEach((artist) => {
                allLibraryArtists[count] = artist;
                count++
            })
            return {
                ...state,
                ...allLibraryArtists,
            }
        case ADD_LIBRARYARTIST:
            newState = {
                ...state,
            };
            return { ...newState };
        case REMOVE_LIBRARYARTIST:
            newState = { ...state }
            delete newState[action.libraryArtist]
            return { ...newState }
        default:
            return state;
    }
}

export default libraryArtistReducer;
