import { csrfFetch } from "./csrf.js";

export const LOAD_ALBUMS = "albums/LOAD_ALBUMS";

const loadAlbums = (albums) => ({
    type: LOAD_ALBUMS,
    albums
})

export const getAlbums = () => async dispatch => {
    const res = await csrfFetch(`/api/albums`)

    if (res.ok) {
        const albums = await res.json();
        dispatch(loadAlbums(albums));
    }
}

const initialState = {};

const albumsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS:
            const allAlbums = {};
            action.albums.forEach((album) => {
                allAlbums[album.id] = album;
            })
            return {
                ...state,
                ...allAlbums,
            }
        default:
            return state;
    }
}

export default albumsReducer;
