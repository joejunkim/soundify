import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/playlist"

import "./CreatePlaylist.css";

function CreatePlaylistForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,
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
                    Name
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
