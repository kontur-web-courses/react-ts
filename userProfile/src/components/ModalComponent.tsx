import React from 'react';
import { Button, Modal } from '@skbkontur/react-ui';

interface ModalComponentProps {
    closeModal?: () => void;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({ closeModal }) => {
    return (
        <Modal onClose={closeModal}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Footer>
                <Button onClick={closeModal}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};
