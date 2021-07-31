import React, { useState } from 'react';

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = (props) => {
    const [state, setState] = useState({});
    return (
        <MusicPlayerContext.Provider value={[state, setState]}>
            {props.children}
        </MusicPlayerContext.Provider>
    );
}

export { MusicPlayerContext, MusicPlayerProvider };
