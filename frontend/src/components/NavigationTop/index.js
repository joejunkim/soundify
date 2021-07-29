import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './NavigationTop.css';

function NavigationTop({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const { library } = useParams()

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal/>
      </>
    );
  }

  let middleNav;
  if ( library ) {
    middleNav = (
      <>
        <NavLink exact to="/library/collection/playlists">Playlists</NavLink>
        <NavLink exact to="/library/collection/songs">Songs</NavLink>
        <NavLink exact to="/library/collection/artists">Artists</NavLink>
        <NavLink exact to="/library/collection/albums">Albums</NavLink>
      </>
    )
  } else {
    middleNav = (
      <>
        <div>SEARCH BAR</div>
      </>
    )
  }

  return (
    <div id='navbar-top__container'>
      <div id='navbar-top__arrows'>
          {'< >'}
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
