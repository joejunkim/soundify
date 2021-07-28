import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage"
import SignupFormPage from './components/SignupFormPage';
import LoginFormPage from "./components/LoginFormPage";
import * as sessionActions from './store/session';
import Navigation from './components/Navigation';
import LibraryPage from './components/LibraryPage'
import { Modal } from './context/Modal';
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
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
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <SignupFormPage />
          </Route>
          <Route path='/library'>
            <LibraryPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
