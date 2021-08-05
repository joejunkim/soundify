import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { editPlaylist } from "../../store/playlist"

import "./EditPlaylist.css";


function EditPlaylistForm({ playlist, setShowModal, setTrigger }) {
    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState(playlist.name);
    const [image, setImage] = useState(playlist.image);
    const [description, setDescription] = useState(playlist.description);

    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const payload = {
            name,
            image,
            description,
            libraryId: sessionUser.id
        }

        await dispatch(editPlaylist(payload, id))
        setTrigger((prev) => !prev)
        setShowModal(false)
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return (
        <div id='edit__form'>
            <form onSubmit={handleSubmit}>
            <h1>Edit Details</h1>
                <div id='edit__info'>
                    <img src={playlist?.image} alt='playlist'/>
                    <div id='edit__input'>
                        <label>
                            <div>Name</div>
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
                    </div>
                </div>
                <button type="submit">Confirm Changes</button>
            </form>
        </div>
    )
}

export default EditPlaylistForm;
