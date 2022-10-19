import { Button, Gapped } from '@skbkontur/react-ui';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './style.css';
import ModalOnSave from './Modal';
import InputRow from './InputRow';
import SelectRow from './SelectRow';

// Выполнены задания 1-8

const fieldRepo: { [key: string]: string } = {
    Имя: '',
    Фамилия: '',
    Город: ''
};

const Form = () => {
    const [isOpened, setOpenedState] = useState(false);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');

    const [nameEmpty, setNameEmpty] = useState(false);
    const [surnameEmpty, setSurnameEmpty] = useState(false);

    const openModal = () => {
        setOpenedState(true);
    };
    const closeModal = () => {
        setOpenedState(false);
    };

    const [changeMessage, setChangeMessage] = useState(Array<string>());
    const saveChanges = () => {
        if (!name) setNameEmpty(true);
        if (!surname) setSurnameEmpty(true);

        if (!(name && surname)) return;

        const newChangeMessage = [
            addIfUpdated('Имя', name),
            addIfUpdated('Фамилия', surname),
            addIfUpdated('Город', city)
        ];

        setChangeMessage(newChangeMessage);
        openModal();
    };

    const addIfUpdated = (field_name: string, new_value: string) => {
        const old_value = fieldRepo[field_name];
        fieldRepo[field_name] = new_value;
        if (old_value && old_value !== new_value) {
            return `${field_name}: Было ${old_value}, стало ${new_value}`;
        }
        return '';
    };

    return (
        <div className="form">
            <Gapped vertical gap={20}>
                <p className="form-title">Информация о пользователе</p>
                <InputRow
                    title="Имя"
                    placeholder="Введите имя пользователя"
                    onInputChange={value => {
                        setName(value);
                        setNameEmpty(false);
                    }}
                    isError={nameEmpty}
                />

                <InputRow
                    title="Фамилия"
                    placeholder="Введите фамилию пользователя"
                    onInputChange={value => {
                        setSurname(value);
                        setSurnameEmpty(false);
                    }}
                    isError={surnameEmpty}
                />

                <SelectRow
                    title="Город"
                    onInputChange={value => {
                        setCity(value);
                    }}
                />
                <Button use="primary" onClick={saveChanges}>
                    Сохранить
                </Button>
            </Gapped>
            {isOpened && <ModalOnSave close={closeModal} changeMessage={changeMessage} />}
        </div>
    );
};

ReactDom.render(<Form />, document.getElementById('root'));
