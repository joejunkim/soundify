import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreatePlaylistForm from './CreatePlaylistForm'
import "./CreatePlaylist.css";

function CreatePlaylistModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)}>Create Playlist</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <CreatePlaylistForm setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
      );
}

export default CreatePlaylistModal;
