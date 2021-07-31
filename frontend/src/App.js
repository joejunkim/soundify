import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage"
import * as sessionActions from './store/session';
import LibraryPage from './components/LibraryPage'
import PlaylistPage from './components/PlaylistPage'
import ArtistPage from './components/ArtistPage';
import AlbumPage from './components/AlbumPage'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {/* <Navigation isLoaded={isLoaded} /> */}
      {/* <button onClick={() => setShowModal(true)}>Modal</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h1>LET'S GOOOOO</h1>
        </Modal>
      )} */}
      {isLoaded && (
        <Switch>
          <Route path='/' exact>
            <LandingPage />
          </Route>
          <Route path={['/home', '/search', '/:library/collection/:type']}>
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
      )}
    </>
  );
}

export default App;
