import { Button, Modal } from '@skbkontur/react-ui';
import React from 'react';
import { FormData } from './Form';

type TProps = {
    savedData: FormData;
    person: FormData;
    onClose: Function;
};

const RenderModal = (props: TProps) => {
    const { savedData, person, onClose } = props;

    const closeModal = () => {
        onClose(false);
        savedData.name = person.name;
        savedData.surname = person.surname;
        savedData.city = person.city;
    };

    const renderDiff = (field: keyof FormData, fieldName: string) => {
        if (savedData[field] !== person[field]) {
            return (
                <p>
                    {fieldName}: было {savedData[field] || '*ничего*'}, стало {person[field] || '*ничего*'}
                </p>
            );
        }
        return null;
    };

    const renderChange = () => {
        return (
            <>
                <p>Измененные данные:</p>
                {renderDiff('name', 'Имя')}
                {renderDiff('surname', 'Фамилия')}
                {renderDiff('city', 'Город')}
            </>
        );
    };

    const isNothingChanged = (Object.keys(savedData) as (keyof FormData)[]).every(
        key => person[key] === savedData[key]
    );

    return (
        <Modal onClose={closeModal}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Body>{!isNothingChanged ? renderChange() : <p>Ничего не изменилось</p>}</Modal.Body>
            <Modal.Footer>
                <Button onClick={closeModal}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RenderModal;
