import React, { useState } from 'react';
import { cities } from '../data/cities';
import { Gapped, Input, Select, Button } from '@skbkontur/react-ui';
import { ModalComponent } from "./ModalComponent";

enum FormData {
    name = 'name',
    surname = 'surname',
    city = 'city'
}

export const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');
    const [showModal, setShowModal] = useState(false);

    const getCities = () => cities.map(city => city.title);

    const onChangeValue = (fieldName: string) => {
        return (value: string): void | undefined => {
            if (fieldName === FormData.name) {
                setName(value);
            } else if (fieldName === FormData.surname) {
                setSurname(value);
            } else {
                setCity(value);
            }
        };
    };

    const onSave = (): void => setShowModal(true);

    const onCloseModal = (): void => setShowModal(false);

    return (
        <>
            <form>
                <h2>Информация о пользователе</h2>
                <Gapped vertical gap={20}>
                    <div>
                        <label htmlFor="name" className="label">
                            Имя
                        </label>
                        <Input id="name" type="text" value={name} onValueChange={onChangeValue(FormData.name)} />
                    </div>
                    <div>
                        <label htmlFor="surname" className="label">
                            Фамилия
                        </label>
                        <Input
                            id="surname"
                            type="text"
                            value={surname}
                            onValueChange={onChangeValue(FormData.surname)}
                        />
                    </div>
                    <div>
                        <label htmlFor="city" className="label">
                            Город
                        </label>
                        <Select<string>
                            items={getCities()}
                            value={city}
                            placeholder="Выберите город"
                            onValueChange={onChangeValue(FormData.city)}
                        />
                    </div>
                    <Button use="primary" onClick={() => onSave()}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
            {showModal && <ModalComponent closeModal={() => onCloseModal()} />}
        </>
    );
};
