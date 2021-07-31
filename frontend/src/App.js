import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import LandingPage from "./components/LandingPage"
import SearchPage from './components/SearchPage';
import LibraryPage from './components/LibraryPage'
import PlaylistPage from './components/PlaylistPage'
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage'

import { MusicPlayerContext } from './context/MusicPlayerContext';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('album')
  const [source, setSource] = useState('2RyIQJb2ruv5nJ55EFEwyu?theme=0')

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
            <Route path='/search' exact>
              <SearchPage />
            </Route>
            <Route path={['/home', '/:library/collection/:type']}>
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
    </>
  );
}

export default App;
