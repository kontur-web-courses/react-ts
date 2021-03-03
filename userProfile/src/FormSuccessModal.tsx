import React from 'react';

import { Modal, Gapped, Button } from '@skbkontur/react-ui';

import { Change } from './common-types';

type FormSuccessModalProps = {
    close: () => void;
    changes: Change[];
};

export const FormSuccessModal: React.FC<FormSuccessModalProps> = ({ close, changes }) => {
    const renderChange = (change: Change) => {
        const { fieldName, before, after } = change;

        const diff = [];
        before && diff.push(`было ${before}`);
        after && diff.push(`стало ${after}`);

        return (
            <div key={fieldName}>
                <p className='form_no_margin'>
                    {fieldName}: {diff.join(', ')}
                </p>
            </div>
        );
    }

    return (
        <Modal onClose={close}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Body>
                <Gapped vertical gap={5}>
                    {changes.map(renderChange)}
                </Gapped>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    )
};