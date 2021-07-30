import { csrfFetch } from "./csrf.js";

export const LOAD_LIBRARIES = "libraries/LOAD_LIBRARIES";
export const ADD_LIBRARY = "libraries/ADD_LIBRARY"

const loadLibrary = (libraries) => ({
    type: LOAD_LIBRARIES,
    libraries
})

const addLibrary = (library) => ({
    type: ADD_LIBRARY,
    library
})

export const getLibraries = () => async dispatch => {
    const res = await csrfFetch('/api/libraries/')

    if (res.ok) {
        const libraries = await res.json();
        dispatch(loadLibrary(libraries));
    }
}

export const createLibrary = (userId) => async dispatch => {
    const res = await csrfFetch('/api/libraries/',
    {
        method: 'POST',
        body: JSON.stringify(userId)
    })

    if (res.ok) {
        const library = await res.json();
        dispatch(addLibrary(library))
        return;
    }
}

const initialState = {};

const librariesReducer = (state = initialState, action) => {
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
        case ADD_LIBRARY:
            const newState = {
                ...state,
                [action.library.id]: action.library
            };
            return { ...newState };
        default:
            return state;
    }
}

export default librariesReducer;
