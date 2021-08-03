import React from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';

import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';

import './NavigationTop.css';

function NavigationTop({ searchNav }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { library } = useParams()

  const goBack = () => {
    window.history.back()
  }

  const goForward = () => {
    window.history.forward()
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/home')
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div>
        {'Welcome ' + sessionUser.username}
        <button onClick={logout}>Log Out</button>
      </div>
    );
  } else {
    sessionLinks = (
      <>
        <button onClick={() => handleDemo()}>Demo User</button>
        <SignupFormModal/>
        <LoginFormModal />
      </>
    );
  }

  const handleDemo = () => {
    const credential = 'DemoUser'
    const password = 'password'
    dispatch(sessionActions.login({ credential, password }))
}

  let middleNav;
  if ( library ) {
    middleNav = (
      <>
        <NavLink exact to="/library/collection/playlists">Playlists</NavLink>
        <NavLink exact to="/library/collection/artists">Artists</NavLink>
        <NavLink exact to="/library/collection/albums">Albums</NavLink>
        <NavLink exact to="/library/collection/songs">Tracks</NavLink>
      </>
    )
  } else {
    middleNav = searchNav
  }

  return (
    <div id='navbar-top__container'>
      <div id='navbar-top__arrows'>
          <button type='click' onClick={goBack}><BsCaretLeft /></button>
          <button type='click' onClick={goForward}><BsCaretRight /></button>
      </div>
      <div id='navbar-top__links'>
        {middleNav}
      </div>
      <div id='navbar-top__session'>
        {sessionLinks}
      </div>
    </div>
  );
}

export default NavigationTop;
