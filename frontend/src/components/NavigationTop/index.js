import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from "../../store/session";
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './NavigationTop.css';

function NavigationTop({ searchNav }){
  const sessionUser = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const { library } = useParams()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
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
        <NavLink exact to="/library/collection/songs">Songs</NavLink>
      </>
    )
  } else {
    middleNav = searchNav
  }

  return (
    <div id='navbar-top__container'>
      <div id='navbar-top__arrows'>
          {'<___>'}
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
