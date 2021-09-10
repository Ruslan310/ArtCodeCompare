import React from 'react';
import {Modal} from "react-bootstrap";
import {setModalMessage} from "../redux/action";
import {connect} from "react-redux";

const mapStateToProps = (state) => ({
    modalMessage: state.main.modalMessage,
})
const mapDispatchToProps = ({
    setModalMessage
})

const $ModalMessage = (props) => {
    return (
        <div>
            <Modal
                // size="lg"
                show={!!props.modalMessage}
                onHide={() => props.setModalMessage('')}
                aria-labelledby="example-custom-modal-styling-title">
                <Modal.Body className='modalMessageText'>{props.modalMessage}</Modal.Body>
            </Modal>
        </div>
    );
};

const ModalMessage = connect(mapStateToProps, mapDispatchToProps)($ModalMessage)

export default ModalMessage;