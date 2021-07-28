import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARY = "library/LOAD_LIBRARY";

const loadLibrary = (library) => ({
    type: LOAD_LIBRARY,
    library
})

export const getLibrary = (id) => async dispatch => {
    const res = await csrfFetch(`/api/libraries/${id}`)

    if (res.ok) {
        const library = await res.json();
        dispatch(loadLibrary(library));
    }
}

const initialState = {};

const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIBRARY:
            return {
                ...state,
                ...action.library
            }
        default:
            return state;
    }
}

export default libraryReducer;
