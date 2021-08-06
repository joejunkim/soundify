import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import librariesReducer from './library'
import playlistsReducer from './playlist';
import artistsReducer from './artists'
import albumsReducer from './albums'
import songsReducer from './songs'
import librarySongReducer from './songtolibrary'
import playlistSongReducer from './songtoplaylist'
import libraryArtistReducer from './artisttolibrary'
import libraryAlbumReducer from './albumtolibrary'

const rootReducer = combineReducers({
  session,
  libraries: librariesReducer,
  playlists: playlistsReducer,
  artists: artistsReducer,
  albums: albumsReducer,
  songs: songsReducer,
  librarySongs: librarySongReducer,
  playlistSongs: playlistSongReducer,
  libraryArtists: libraryArtistReducer,
  libraryAlbums: libraryAlbumReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
