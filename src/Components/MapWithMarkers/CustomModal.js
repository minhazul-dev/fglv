import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Thank you! Soon a rider will be assigned to your Location.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>OK</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
