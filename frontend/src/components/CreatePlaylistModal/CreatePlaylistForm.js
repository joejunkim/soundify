import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/playlist"

import "./CreatePlaylist.css";

function CreatePlaylistForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            name,
            image,
            description,
            libraryId: sessionUser.id
        }

        dispatch(createPlaylist(payload))
        setShowModal(false);
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

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
                <label>
                    <input type="file" onChange={updateFile} />
                </label>
                <button type="submit">Create Playlist</button>
            </form>
        </div>
    )
}

export default CreatePlaylistForm;
