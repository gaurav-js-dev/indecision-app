import React from 'react';
import Modal from 'react-modal';

const OptionModal = (props) => (

  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.clearSelectedOption}
    // style={customStyles}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    ariaHideApp={false}
    className="modal"
  >
    <h2 className="modal__title"> Selected Option </h2>
    {props.selectedOption && <p className="modal__body">{props.selectedOption}</p>}
    <button onClick={props.clearSelectedOption}>Close</button>
  </Modal>

)

export default OptionModal;