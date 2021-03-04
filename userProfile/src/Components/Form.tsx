import React, { useState } from 'react';
import { Button, Input, Gapped, Select, Modal } from '@skbkontur/react-ui';

const cities: string[] = ['Екатеринбург', 'Н.Тагил', 'Москва', 'Санкт-Петербург', 'Казань'];

interface FormData {
    name: string;
    surname: string;
    city: string | undefined;
}

const saveData: FormData = {
    name: '',
    surname: '',
    city: ''
};

const defaultData: FormData = {
    name: '',
    surname: '',
    city: cities[0]
};

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
        setPerson({ name: name, surname: surname, city: city });
        setOpened(true);
    };

    const renderForm = () => {
        return (
            <form className="form">
                <Gapped gap={15} vertical>
                    <label>
                        <div className="label">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={name}
                            onChange={e => handlerField('name', e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Фамилия</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={surname}
                            onChange={e => handlerField('surname', e.target.value)}
                        />
                    </label>
                    <label>
                        <div className="label">Город</div>
                        <Select<string>
                            placeholder="Выберите город"
                            items={cities}
                            value={city}
                            onValueChange={e => handlerField('city', e)}
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
            saveData.name = name;
            saveData.surname = surname;
            saveData.city = city;

            setName(defaultData.name);
            setSurname(defaultData.surname);
            setOpened(false);
        };

        const renderDiff = (field: keyof FormData, fieldName: string) => {
            if (saveData[field] !== person[field] && !isNothingChanged) {
                return (
                    <>
                        <p>
                            {fieldName}: было {saveData[field] || '*ничего*'}, стало {person[field] || '*ничего*'}
                        </p>
                    </>
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

        const isNothingChanged = (Object.keys(saveData) as (keyof FormData)[]).every(
            key => person[key] === saveData[key]
        );

        return (
            <Modal onClose={closeModal}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>{!isNothingChanged && renderChange()}</Modal.Body>
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
