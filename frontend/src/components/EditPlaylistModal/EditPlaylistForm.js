import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { editPlaylist } from "../../store/playlist"

import "./EditPlaylist.css";


function EditPlaylistForm({ playlist, setShowModal, onExit }) {
    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState(playlist.title);
    const [imgUrl, setImgUrl] = useState(playlist.imgUrl);
    const [description, setDescription] = useState(playlist.description);

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title,
            imgUrl,
            description,
            libraryId: sessionUser.id
        }

        dispatch(editPlaylist(payload, id))
        onExit();
        setShowModal(false)
    }

    return (
        <div id='edit__form'>
            <form onSubmit={handleSubmit}>
            <h1>Edit Details</h1>
                <div id='edit__info'>
                    <div id='edit__img' />
                    <div id='edit__input'>
                        <label>
                            <div>Title</div>
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
                    </div>
                </div>
                <button type="submit">Confirm Changes</button>
            </form>
        </div>
    )
}

export default EditPlaylistForm;
