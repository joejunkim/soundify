import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeletePlaylistForm from './DeletePlaylistForm'

import { BiTrash } from "react-icons/bi"
import "./DeletePlaylist.css";

function DeletePlaylistModal({ mySongs, setTrigger }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
          <button onClick={() => setShowModal(true)}><BiTrash /></button>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <DeletePlaylistForm setShowModal={setShowModal} mySongs={mySongs} setTrigger={setTrigger}/>
            </Modal>
          )}
        </>
      );
}

export default DeletePlaylistModal;
