import { csrfFetch } from "./csrf.js";

export const LOAD_ARTISTS = "artists/LOAD_ARTISTS";

const loadArtists = (artists) => ({
    type: LOAD_ARTISTS,
    artists
})

export const getArtists = () => async dispatch => {
    const res = await csrfFetch(`/api/artists`)

    if (res.ok) {
        const artists = await res.json();
        dispatch(loadArtists(artists));
    }
}

const initialState = {};

const artistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ARTISTS:
            const allArtists = {};
            action.artists.forEach((artist) => {
                allArtists[artist.id] = artist;
            })
            return {
                ...state,
                ...allArtists,
            }
        default:
            return state;
    }
}

export default artistsReducer;
