import React, { ReactNode } from 'react';
import { Button, Modal } from '@skbkontur/react-ui';

interface Props {
    open: boolean;
    onClose: () => void;
    children?: ReactNode;
}

const FormModal: React.FC<Props> = ({ open, onClose, children }: Props) => {
    if (open) {
        return (
            <Modal onClose={onClose}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>{children}</Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
    return null;
};

export default FormModal;
