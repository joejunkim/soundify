import React, { useContext, useState, useEffect } from 'react';
import './MusicPlayer.css';

export const MusicPlayerContext = React.createContext();

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
                <iframe src={`https://open.spotify.com/embed/${type}/${source}?theme=0&autoplay=0`} width="100%" height="80" frameBorder="0" allowtransparency="true" allow="encrypted media"></iframe>
            </div>
        )
    } else {
        return (
            <div id='music-player__container' />
        )
    }
}
