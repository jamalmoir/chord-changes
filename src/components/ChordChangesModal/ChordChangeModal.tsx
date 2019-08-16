import React from 'react';

import Modal from 'react-modal';

import Types from 'Types';

import styles from './chordChangeModal.scss';

interface ChordChangeModalProps {
  isOpen: boolean;
  chordA: Types.Chord;
  chordB: Types.Chord;
}

export const ChordChangeModal = (props: ChordChangeModalProps) => {
  const customStyles = {
    content : {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80vh',
      height: '80vh',
    }
  };

  return (
    <Modal
      isOpen={ props.isOpen}
      contentLabel="Record Chord Changes"
      style={ customStyles }
      shouldCloseOnOverlayClick={ true }
    >
    ...
    </Modal>
  )
}