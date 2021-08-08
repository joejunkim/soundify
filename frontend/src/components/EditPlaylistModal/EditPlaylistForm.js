import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { getPlayLists } from '../../store/playlist';
import { getPlaylistSongs } from '../../store/songtoplaylist';
import { editPlaylist } from "../../store/playlist"

import default_pic from './default_playlist.png'
import "./EditPlaylist.css";


function EditPlaylistForm({ playlist, setShowModal, setTrigger }) {
    const { id } = useParams();
    const sessionUser = useSelector((state) => state.session.user);

    const [name, setName] = useState(playlist.name);
    const [image, setImage] = useState(playlist.image);
    const [description, setDescription] = useState(playlist.description);
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch();

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
            dispatch(editPlaylist(payload, id))
            setTrigger((prev) => !prev)
            setShowModal(false)
            return;
        }
    }

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
      };

    useEffect(() => {
        dispatch(getPlayLists())
        dispatch(getPlaylistSongs())
    }, [dispatch]);

    return (
        <div id='edit__form'>
            <form onSubmit={handleSubmit}>
            <h1>Edit Details</h1>
                <div id='edit__content'>
                    <div id='edit__image'>
                        { playlist?.image
                            ? (<img src={playlist?.image} alt='playlist'/>)
                            : (<img src={default_pic} alt='playlist'/>)}
                        <label>
                            <input type="file" onChange={updateFile} />
                        </label>
                    </div>
                    <div id='edit__input'>
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
                            id='edit__description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            />
                    </div>
                </div>
                <ul className='form__errors'>
                    {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div id='edit__submit'>
                    <button type="submit">Confirm Changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditPlaylistForm;
