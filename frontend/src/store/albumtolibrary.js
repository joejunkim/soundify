import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARYALBUMS = "libraryalbums/LOAD_LIBRARYALBUMS";
export const ADD_LIBRARYALBUM = "libraryalbums/ADD_LIBRARYALBUM";
export const REMOVE_LIBRARYALBUM = "libraryalbums/REMOVE_LIBRARYALBUM"

const loadLibraryAlbums = (libraryAlbums) => ({
    type: LOAD_LIBRARYALBUMS,
    libraryAlbums
})

const addLibraryAlbum = (libraryAlbum) => ({
    type: ADD_LIBRARYALBUM,
    libraryAlbum
})

const removeLibraryAlbum = (libraryAlbum) => ({
    type: REMOVE_LIBRARYALBUM,
    libraryAlbum
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
    const res = await csrfFetch(`/api/albumstolibraries/`,
        { method: 'DELETE', body: JSON.stringify(data) });

    if (res.ok) {
        const libraryAlbum = await res.json();
        dispatch(removeLibraryAlbum(libraryAlbum));
        return;
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
            for (let key in newState) {
                let value = newState[key]
                if (value.libraryId === action.libraryAlbum.libraryId && value.albumId === action.libraryAlbum.albumId) {
                    delete newState[key]
                }
            }
            return { ...newState }
        default:
            return state;
    }
}

export default libraryAlbumReducer;
