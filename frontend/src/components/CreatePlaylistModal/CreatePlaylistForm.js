import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "../../store/playlist"

import default_pic from './default_playlist.png'
import "./CreatePlaylist.css";

function CreatePlaylistForm({ setShowModal }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    let formErrors = [];

    const handleSubmit = async(e) => {
        e.preventDefault();
        setErrors([]);
        const payload = {
            name,
            image,
            description,
            libraryId: sessionUser.id
        }

        if (name.length > 20) {
            formErrors.push('Name must be 20 or fewer characters')
        }
        if (description.length > 200) {
            formErrors.push('Description must be 200 or fewer characters')
        }
        if (formErrors.length) {
            return setErrors(formErrors);
        } else {
            await dispatch(createPlaylist(payload))
            setShowModal(false)
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    return (
        <div id='create__form'>
            <h1>Create Your Playlist</h1>
            <form onSubmit={handleSubmit}>
                <div id='create__content'>
                    <div id='create__image'>
                        <img src={default_pic} alt='default' />
                        <label>
                            <input type="file" onChange={updateFile} />
                        </label>
                    </div>
                    <div id='create__input'>
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            />
                        <label>Description</label>
                        <textarea
                            type="text"
                            value={description}
                            id='create__description'
                            onChange={(e) => setDescription(e.target.value)}
                            />
                    </div>
                </div>
                <ul className='form__errors'>
                    {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div id='create__submit'>
                    <button type="submit">Create Playlist</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePlaylistForm;
