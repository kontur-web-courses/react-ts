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
    const [name, setName] = useState(defaultData.name);
    const [surname, setSurname] = useState(defaultData.surname);
    const [city, setCity] = useState(defaultData.city);

    const [person, setPerson] = useState({
        name,
        surname,
        city
    });

    const [opened, setOpened] = useState(false);

    const handlerField = (field: keyof FormData, value: string) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'surname':
                setSurname(value);
                break;
            case 'city':
                setCity(value);
                break;
            default:
                throw new Error();
        }
    };

    const submitForm = () => {
        setPerson({ name, surname, city });
        setOpened(true);
    };

    const renderForm = () => {
        return (
            <form className="form">
                <Gapped gap={15} vertical>
                    <label className="label">
                        <p className="labelText">Имя</p>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={name}
                            onValueChange={value => handlerField('name', value)}
                        />
                    </label>
                    <label className="label">
                        <p className="labelText">Фамилия</p>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={surname}
                            onValueChange={value => handlerField('surname', value)}
                        />
                    </label>
                    <label className="label">
                        <p className="labelText">Город</p>
                        <Select<string>
                            placeholder="Выберите город"
                            items={cities}
                            value={city}
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
            savedData.name = name;
            savedData.surname = surname;
            savedData.city = city;

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
