import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createPlaylist } from "../../store/playlist"

import "./CreatePlaylist.css";

function CreatePlaylistForm({ setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title,
            imgUrl,
            description,
            libraryId: sessionUser.id
        }

        dispatch(createPlaylist(payload))
        setShowModal(false);
    }

    return (
        <div id='create-playlist__form'>
            <h1>Create Your Playlist</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Playlist</button>
            </form>
        </div>
    )
}

export default CreatePlaylistForm;
