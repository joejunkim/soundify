import React from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { deletePlaylist } from "../../store/playlist"

import "./DeletePlaylist.css";

function DeletePlaylistForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(deletePlaylist(id))
        history.push('/library/collection/playlists')
    }

    return (
        <div id='delete-playlist__form'>
            <h1>Are you sure you want to delete this playlist?</h1>
            <form onSubmit={handleSubmit}>
                <button type="submit">Delete Playlist</button>
            </form>
        </div>
    )
}

export default DeletePlaylistForm;
