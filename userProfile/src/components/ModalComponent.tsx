import React from 'react';
import { Button, Modal } from '@skbkontur/react-ui';
import { DiffFormState } from './Form';

interface ModalComponentProps {
    closeModal?: () => void;
    diffState: DiffFormState;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({ closeModal, diffState }) => {
    return (
        <Modal onClose={closeModal}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Body>
                <p>Измененные данные:</p>
                {diffState.name.hasChanged && (
                    <p>
                        Имя: было {diffState.name.prevValue}, стало {diffState.name.value}
                    </p>
                )}
                {diffState.surname.hasChanged && (
                    <p>
                        Фамилия: было {diffState.surname.prevValue}, стало {diffState.surname.value}
                    </p>
                )}
                {diffState.city.hasChanged && (
                    <p>
                        Город: было {diffState.city.prevValue}, стало {diffState.city.value}
                    </p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};
