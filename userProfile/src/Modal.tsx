import { ModeOnSaveProps } from './types';
import { Button, Modal } from '@skbkontur/react-ui';
import React from 'react';

const ModalOnSave = ({ close, changeMessage }: ModeOnSaveProps) => (
    <Modal onClose={close}>
        <Modal.Header>Пользователь сохранен</Modal.Header>
        <Modal.Body>
            {changeMessage.map((data, i) => (
                <p key={i}>{data}</p>
            ))}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={close}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
);

export default ModalOnSave;
