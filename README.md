# Soundify

Soundify is a web application for users to listen to tracks and save their favorite tracks, either through a personal library of tracks, albums, and artists, or playlists that users can create and customize. Inspired by Spotify, Soundify was built using React, Redux, and Express, along with Spotify's public embedded music player.

Explore and listen at soundify-aa.herokuapp.com

## Features and Technology

### Features
- Create / edit / delete playlists
- Add tracks to your library collection
- Add albums to your library collection
- Add artists to your library collection
- Search for playlists, artists, albums, and tracks
- Continuous music streaming when navigating site

### Technologies
- React.js
- Redux.js
- Express.js
- PostgreSQL
- Sequelize
- CSS3
- Heroku
- AWS API (image uploading)

## Main Components
Soundify is a single-page web application built with components using React. React works with Redux to make changes on the front-end, speeding up processes and rendering, creating a better user experience. Redux is also used to speak to the back-end.

### Splash / Landing Page:
![splash-soundify](https://user-images.githubusercontent.com/69053706/133916366-593a61b0-c83f-4196-a072-a28aa3f59fa4.jpg)

### Home Page:
![home-soundify](https://user-images.githubusercontent.com/69053706/133916336-a0a70965-6d58-4cb1-ac0f-4a7441c4c56e.JPG)

### Search Page:
![search-soundify](https://user-images.githubusercontent.com/69053706/133916340-6572742e-adb1-4cde-8128-99c0b8310a64.JPG)

### Library Page:
![library-soundify](https://user-images.githubusercontent.com/69053706/133916342-8e9b6a82-dc33-4c9f-8ee2-7dff58b2e55c.JPG)

### Artist Page:
![artist-soundify](https://user-images.githubusercontent.com/69053706/133916343-5358a124-8e3f-4cbe-9281-8df4eedaa515.JPG)

### Album Page:
![album-soundify](https://user-images.githubusercontent.com/69053706/133916345-a220556d-bd71-4385-b961-43516261ecba.JPG)

### Playlist Page:
![playlist-soundify](https://user-images.githubusercontent.com/69053706/133916347-ed22ef1e-c76f-46c6-ba0f-88b264b0c702.JPG)

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
