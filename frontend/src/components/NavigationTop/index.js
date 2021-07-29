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

  let collectionLinks;
  if ( library ) {
    collectionLinks = (
      <>
        <NavLink exact to="/library/collection/playlists">Playlists</NavLink>
        <NavLink exact to="/library/collection/songs">Songs</NavLink>
        <NavLink exact to="/library/collection/artists">Artists</NavLink>
        <NavLink exact to="/library/collection/albums">Albums</NavLink>
      </>
    )
  }

  return (
    <div id='navbar__container'>
      <div id='navbar__arrows'>
          {'< >'}
      </div>
      <div id='navbar__links'>
        {collectionLinks}
      </div>
      <div id='navbar__session'>
        {sessionLinks}
      </div>
    </div>
  );
}

export default NavigationTop;
