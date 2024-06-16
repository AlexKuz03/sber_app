import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const ErrorModal = ({ isOpen, toggle, errorMessage }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Ошибка ввода</ModalHeader>
            <ModalBody>
                {errorMessage}
            </ModalBody>
        </Modal>
    );
};

export default ErrorModal;
