import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import LandingPage from "./components/LandingPage"
import HomePage from "./components/HomePage"
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage'
import PlaylistPage from './components/PlaylistPage'
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage'
import { MusicPlayer } from './context/MusicPlayer.js'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <>
          <Switch>
            <Route path='/' exact>
              <LandingPage />
            </Route>
            <Route path='/home' exact>
              <HomePage />
            </Route>
            <Route path='/search' exact>
              <SearchPage />
            </Route>
            <Route path='/:library/collection/:type' >
              <LibraryPage />
            </Route>
            <Route path='/playlist/:id' exact>
              <PlaylistPage />
            </Route>
            <Route path='/artist/:id' exact>
              <ArtistPage />
            </Route>
            <Route path='/album/:id' exact>
              <AlbumPage />
            </Route>
          </Switch>
        </>
      )}
      <MusicPlayer/>
    </>
  );
}

export default App;
