import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaylistForm from './DeletePlaylistForm'
import "./DeletePlaylist.css";

function DeletePlaylistModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)}>Delete Playlist</button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeletePlaylistForm setShowModal={setShowModal}/>
            </Modal>
          )}
        </>
      );
}

export default DeletePlaylistModal;
