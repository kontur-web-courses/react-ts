import React, { useState } from 'react';
import { Form } from './Form';
import { ModalComponent } from './ModalComponent';

export const Main: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const onCloseModal = (): void => setShowModal(false);
    const onSaveForm = (): void => setShowModal(true);

    return (
        <>
            <Form saveForm={() => onSaveForm()} />
            {showModal && <ModalComponent closeModal={() => onCloseModal()} />}
        </>
    );
};
