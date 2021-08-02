import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditPlaylistForm from './EditPlaylistForm'

import { BsPencil } from "react-icons/bs"
import "./EditPlaylist.css";

function EditPlaylistModal({ playlist, onExit }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)}><BsPencil /></button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <EditPlaylistForm playlist={playlist} setShowModal={setShowModal} onExit={onExit}/>
            </Modal>
          )}
        </>
      );
}

export default EditPlaylistModal;
