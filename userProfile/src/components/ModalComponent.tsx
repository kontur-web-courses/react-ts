import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Button, Modal } from '@skbkontur/react-ui';

type ModalProps = {
    currentData: FormData;
    prevData: FormData;
};

const ModalComponent = (props: ModalProps) => {
    const closeAction = () => {
        props.currentFormData({ ...props.currentData });
        props.close(false);
    };

    const updates = compareData(props.currentData, props.prevData);
    return (
        <Modal onClose={closeAction}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Body>
                {updates.length > 0 ? <p>Измененные данные:</p> : <p>Данные добавлены.</p>}
                {updates.map(item => (
                    <p key={item}>{item}</p>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeAction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

enum DataType {
    name = 'Имя',
    lastName = 'Фамилия',
    city = 'Город'
}

function compareData(currentData: FormData, prevData: FormData): string[] {
    let updates: string[] = [];
    for (const key in currentData) {
        if (prevData[key] && currentData[key] !== prevData[key])
            updates.push(DataType[key] + ': было ' + prevData[key] + ', стало ' + currentData[key]);
    }
    return updates;
}

export default ModalComponent;
