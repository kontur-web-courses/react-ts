import React, { useState } from 'react';
import { Button, Input, Gapped, Select, Modal } from '@skbkontur/react-ui';

const cities: string[] = ['Екатеринбург', 'Н.Тагил', 'Москва', 'Санкт-Петербург', 'Казань'];

interface FormData {
    name: string;
    surname: string;
    city: string | undefined;
}

const defaultData: FormData = {
    name: '',
    surname: '',
    city: undefined
};

const savedData: FormData = { ...defaultData };

const Form = () => {
    const [person, setPerson] = useState({ ...defaultData });
    const [opened, setOpened] = useState(false);

    const handlerField = (field: keyof FormData, value: string) => {
        setPerson({ ...person, [field]: value });
    };

    const submitForm = () => {
        setOpened(true);
    };

    const renderForm = () => {
        return (
            <form className="form">
                <Gapped gap={15} vertical>
                    <label className="label">
                        <span className="labelText">Имя</span>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={person.name}
                            onValueChange={value => handlerField('name', value)}
                        />
                    </label>
                    <label className="label">
                        <span className="labelText">Фамилия</span>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={person.surname}
                            onValueChange={value => handlerField('surname', value)}
                        />
                    </label>
                    <label className="label">
                        <span className="labelText">Город</span>
                        <Select<string>
                            placeholder="Выберите город"
                            items={cities}
                            value={person.city}
                            onValueChange={value => handlerField('city', value)}
                        />
                    </label>

                    <Button use="primary" size="large" onClick={submitForm}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    };

    const renderModal = () => {
        const closeModal = () => {
            savedData.name = person.name;
            savedData.surname = person.surname;
            savedData.city = person.city;

            setOpened(false);
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

    return (
        <>
            <h2>Информация о пользователе</h2>
            {renderForm()}
            {opened && renderModal()}
        </>
    );
};

export default Form;
