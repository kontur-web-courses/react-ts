import React, { useState } from 'react';
import { Form } from './Form';
import { ModalComponent } from './ModalComponent';

export interface DiffFormState {
    [key: string]: {
        prevValue: string;
        value: string;
        hasChanged: boolean;
    };
}

export const Main: React.FC = () => {
    const [diffFormState, setDiffFormState] = useState<DiffFormState>({});
    const [showModal, setShowModal] = useState(false);
    const onCloseModal = (): void => setShowModal(false);
    const onSaveForm = (diffFormState: DiffFormState): void => {
        setShowModal(true);
        setDiffFormState(diffFormState);
    };

    return (
        <>
            <Form saveForm={diffState => onSaveForm(diffState)} />
            {showModal && <ModalComponent closeModal={() => onCloseModal()} diffState={diffFormState} />}
        </>
    );
};
