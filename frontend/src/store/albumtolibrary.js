import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARYALBUMS = "libraryAlbums/LOAD_LIBRARYALBUMS";
export const ADD_LIBRARYALBUM = "libraryAlbums/ADD_LIBRARYALBUM";
export const REMOVE_LIBRARYALBUM = "libraryAlbums/REMOVE_LIBRARYALBUM"

const loadLibraryAlbums = (libraryAlbums) => ({
    type: LOAD_LIBRARYALBUMS,
    libraryAlbums
})

const addLibraryAlbum = (libraryAlbum) => ({
    type: ADD_LIBRARYALBUM,
    libraryAlbum
})

const removeLibraryAlbum = (librarySong) => ({
    type: REMOVE_LIBRARYALBUM,
    librarySong
})

export const getLibraryAlbums = () => async dispatch => {
    const res = await csrfFetch(`/api/albumstolibraries`)

    if (res.ok) {
        const libraryAlbums = await res.json();
        dispatch(loadLibraryAlbums(libraryAlbums));
    }
}

export const createLibraryAlbum = (data) => async dispatch => {
    const res = await csrfFetch('/api/albumstolibraries',
        {
            method: 'POST',
            body: JSON.stringify(data)
        })

    if (res.ok) {
        const libraryAlbum = await res.json();
        dispatch(addLibraryAlbum(libraryAlbum))
        return;
    }
}

export const deleteLibraryAlbum = (data) => async dispatch => {
    const response = await csrfFetch(`/api/albumstolibraries/`,
        { method: 'DELETE', body: JSON.stringify(data) });

    if (response.ok) {
        dispatch(removeLibraryAlbum());
    }
}

const initialState = {};
let newState = {};

const libraryAlbumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIBRARYALBUMS:
            const allLibraryAlbums = {};
            let count = 1;
            action.libraryAlbums.forEach((album) => {
                allLibraryAlbums[count] = album;
                count++
            })
            return {
                ...state,
                ...allLibraryAlbums,
            }
        case ADD_LIBRARYALBUM:
            newState = {
                ...state,
            };
            return { ...newState };
        case REMOVE_LIBRARYALBUM:
            newState = { ...state }
            delete newState[action.libraryAlbum]
            return { ...newState }
        default:
            return state;
    }
}

export default libraryAlbumReducer;
