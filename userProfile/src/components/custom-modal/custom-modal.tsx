import React from 'react';
import { Button, Modal } from '@skbkontur/react-ui';

type CustomModalProps = {
    message: string[];
    onClose: () => void;
};

const CustomModal = ({ message, onClose }: CustomModalProps) => {
    return (
        <Modal onClose={onClose}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            {message.length !== 0 && (
                <Modal.Body>
                    <p>Измененные данные:</p>
                    {message.map(msg => (
                        <p key={msg.length}>{msg}</p>
                    ))}
                </Modal.Body>
            )}
            <Modal.Footer>
                <Button onClick={onClose}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;
