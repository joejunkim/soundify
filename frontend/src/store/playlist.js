import { csrfFetch } from "./csrf.js";

export const LOAD_PLAYLISTS = "library/LOAD_PLAYLISTS";

const loadPlaylists = (playlists) => ({
    type: LOAD_PLAYLISTS,
    playlists
})

export const getPlayLists = () => async dispatch => {
    const res = await csrfFetch(`/api/playlists`)

    if (res.ok) {
        const playlists = await res.json();
        dispatch(loadPlaylists(playlists));
    }
}

const initialState = {};

const playlistsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PLAYLISTS:
            const allPlaylists = {};
            action.playlists.forEach((playlist) => {
                allPlaylists[playlist.id] = playlist;
            })
            return {
                ...state,
                ...allPlaylists,
            }
        default:
            return state;
    }
}

export default playlistsReducer;
