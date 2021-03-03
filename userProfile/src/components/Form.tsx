import React, { useReducer, useState } from 'react';
import { cities } from '../data/cities';
import { Gapped, Input, Select, Button } from '@skbkontur/react-ui';

enum FormDataEnum {
    name = 'name',
    surname = 'surname',
    city = 'city'
}

interface FormData {
    name: string;
    surname: string;
    city: string;
}

interface FormPropTypes {
    saveForm: (diffState: {}) => void;
}

const diffState = {
    name: {
        prevValue: '',
        value: '',
        hasChanged: false
    },
    surname: {
        prevValue: '',
        value: '',
        hasChanged: false
    },
    city: {
        prevValue: '',
        value: '',
        hasChanged: false
    }
};

export const Form: React.FC<FormPropTypes> = ({ saveForm }) => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [city, setCity] = useState<string>('');

    const getCities = () => cities.map(city => city.title);

    const onChangeValue = (fieldName: string) => {
        return (value: string): void | undefined => {
            if (fieldName === FormDataEnum.name) {
                setName(value);
            } else if (fieldName === FormDataEnum.surname) {
                setSurname(value);
            } else {
                setCity(value);
            }
        };
    };

    const onSave = () => {
        Object.keys(diffState).forEach(key => {
            if (key === FormDataEnum.name) {
                diffState.name.prevValue = diffState.name.value;
                diffState.name.value = name;
                diffState.name.hasChanged = diffState.name.prevValue !== diffState.name.value;
            } else if (key === FormDataEnum.surname) {
                diffState.surname.prevValue = diffState.surname.value;
                diffState.surname.value = surname;
                diffState.surname.hasChanged = diffState.surname.prevValue !== diffState.surname.value;
            } else if (key === FormDataEnum.city) {
                diffState.city.prevValue = diffState.city.value;
                diffState.city.value = city;
                diffState.city.hasChanged = diffState.city.prevValue !== diffState.city.value;
            }
        });

        saveForm(diffState);
    };

    return (
        <>
            <form>
                <h2>Информация о пользователе</h2>
                <Gapped vertical gap={20}>
                    <div>
                        <label htmlFor="name" className="label">
                            Имя
                        </label>
                        <Input id="name" type="text" value={name} onValueChange={onChangeValue(FormDataEnum.name)} />
                    </div>
                    <div>
                        <label htmlFor="surname" className="label">
                            Фамилия
                        </label>
                        <Input
                            id="surname"
                            type="text"
                            value={surname}
                            onValueChange={onChangeValue(FormDataEnum.surname)}
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
                            onValueChange={onChangeValue(FormDataEnum.city)}
                        />
                    </div>
                    <Button use="primary" onClick={() => onSave()}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        </>
    );
};
