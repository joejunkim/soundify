import { csrfFetch } from "./csrf.js";

export const LOAD_PLAYLISTS = "playlists/LOAD_PLAYLISTS";
export const ADD_PLAYLIST = "playlists/ADD_PLAYLIST"
export const UPDATE_PLAYLIST = "playlists/UPDATE_PLAYLIST"
export const REMOVE_PLAYLIST = "playlists/REMOVE_PLAYLIST"

const loadPlaylists = (playlists) => ({
    type: LOAD_PLAYLISTS,
    playlists
})

const addPlaylist = (playlist) => ({
    type: ADD_PLAYLIST,
    playlist
})

const updatePlaylist = (playlist) => ({
    type: UPDATE_PLAYLIST,
    playlist
})

const removePlaylist = (playlist) => ({
    type: REMOVE_PLAYLIST,
    playlist
})

export const getPlayLists = () => async dispatch => {
    const res = await csrfFetch(`/api/playlists`)

    if (res.ok) {
        const playlists = await res.json();
        dispatch(loadPlaylists(playlists));
    }
}

export const createPlaylist = (data) => async dispatch => {
    const { name, image, description, libraryId } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("libraryId", libraryId);
    if (image) formData.append("image", image);

    const res = await csrfFetch(`/api/playlists/`, {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

    if (res.ok) {
        const playlist = await res.json();
        dispatch(addPlaylist(playlist))
        return;
    }
}

export const editPlaylist = (data, id) => async dispatch => {
    const { name, image, description, libraryId } = data;
    console.log('name', name, 'image', image, 'id', id)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("libraryId", libraryId);
    if (image) formData.append("image", image);

    const res = await csrfFetch(`/api/playlists/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

    if (res.ok) {
        const playlist = await res.json();
        dispatch(updatePlaylist(playlist));
    }
}

export const deletePlaylist = (id) => async dispatch => {
    const res = await csrfFetch(`/api/playlists/${id}`, { method: 'DELETE' });

    if (res.ok) {
        dispatch(removePlaylist(id));
    }
}

const initialState = {};
let newState = {};

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
        case ADD_PLAYLIST:
            newState = {
                ...state,
                [action.playlist.id]: action.playlist
            };
            return { ...newState };
        case UPDATE_PLAYLIST:
            newState = { ...state }
            return {
                ...newState,
                [action.playlist.id]: action.playlist,
            };
        case REMOVE_PLAYLIST:
            newState = { ...state }
            delete newState[action.playlist]
            return { ...newState }
        default:
            return state;
    }
}

export default playlistsReducer;
