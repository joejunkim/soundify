# Soundify

Soundify is a web application for users to listen to tracks and save their favorite tracks, either through a personal library of tracks, albums, and artists, or playlists that users can create and customize. Inspired by Spotify, Soundify was built using React, Redux, and Express, along with Spotify's public embedded music player.

Explore and listen at soundify-aa.herokuapp.com

## Features and Technology

### Features
- Add / edit / delete playlists
- Add tracks to your library collection
- Add albums to your library collection
- Add artists to your library collection
- Search for playlists, artists, albums, and tracks


### Technologies
- React.js
- Redux
- Express
- PostgreSQL
- Heroku
- AWS API (image uploading)

## Main Components
Soundify is a single-page web application built with components using React. React works with Redux to make changes on the front-end, speeding up processes and rendering, creating a better user experience. Redux is also used to speak to the back-end.

### Splash / Landing Page:
![splash](https://soundify-aa.herokuapp.com)

### Home Page:
![home](https://soundify-aa.herokuapp.com/home)

### Search Page:
![search](https://soundify-aa.herokuapp.com/search)

### Library Page:
![library](https://soundify-aa.herokuapp.com/library/collection/playlists)

### Artist Page:
![artist](https://soundify-aa.herokuapp.com/artist/1)

### Album Page:
![album](https://soundify-aa.herokuapp.com/album/1)

### Playlist Page:
![playlist](https://soundify-aa.herokuapp.com/playlist/1)

## Technical Details
### Music Player
Soundify users are given a library that they can customize. The library is created automatically when they sign up for an account. The music player is Spotify's own public music player that I embedded into my app. Every track on spotify is given a specific code that I would insert into the music player when a user chooses that track.

```javascript
export function MusicPlayerProvider({ children }) {
    const [type, setType] = useState('')
    const [source, setSource] = useState('')

    return (
        <MusicPlayerContext.Provider value={{ type, setType, source, setSource }}>
            {children}
        </MusicPlayerContext.Provider>
    );
}

export function MusicPlayer() {
    const { type, source } = useContext(MusicPlayerContext)

    useEffect(() => {}, [type, source]);

    if ( type && source ) {
        return (
            <div id='music-player__container'>
                <iframe title='Music Player' src={`https://open.spotify.com/embed/${type}/${source}&theme=0`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted media"></iframe>
            </div>
        )
    } else {
        return (
            <div id='music-player__container' />
        )
    }
}
```

### Backend Database
Tracks, artists, albums, and playlists are all tracked using through tables to add and remove from a user's library.

Every track, artist, album, playlist, and library are given unique tables, and each unique entry in these tables are given an id that is used to reference other tables. Multiple through tables are used to connect the various tracks, artists, albums, playlists, and libraries. By using Redux, Soundify will update in real time whenever any changes to the database are made by the user.

## Future Improvements
- Add other users' playlists to your library
- Continuous track play for albums, libraries, and playlists
- Autoplay when a track, album, or playlist are clicked
- Track, album, and playlist playtimes
- User account page where user's can edit their user information
- Restructure default images
