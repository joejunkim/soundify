import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARIES = "library/LOAD_LIBRARIES";

const loadLibrary = (libraries) => ({
    type: LOAD_LIBRARIES,
    libraries
})

export const getLibraries = () => async dispatch => {
    const res = await csrfFetch(`/api/libraries/`)

    if (res.ok) {
        const libraries = await res.json();
        dispatch(loadLibrary(libraries));
    }
}

const initialState = {};

const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_LIBRARIES:
            const allLibraries = {};
            action.libraries.forEach((library) => {
                allLibraries[library.id] = library;
            })
            return {
                ...state,
                ...allLibraries,
            }
        default:
            return state;
    }
}

export default libraryReducer;
