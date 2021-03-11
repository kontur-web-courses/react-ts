import React, { useReducer, useState } from 'react';
import { cities } from '../data/cities';
import { Gapped, Input, Select, Button } from '@skbkontur/react-ui';
import {ModalComponent} from "./ModalComponent";

enum FormDataEnum {
    name = 'name',
    surname = 'surname',
    city = 'city'
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

export interface DiffFormState {
    [key: string]: {
        prevValue: string;
        value: string;
        hasChanged: boolean;
    };
}

export const Form: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [diffFormState, setDiffFormState] = useState<DiffFormState>({});
    const [showModal, setShowModal] = useState(false);

    const getCities = (): string[] => cities.map(city => city.title);

    const onChangeValue = (fieldName: string): ((v: string) => void) => {
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

    const onSaveForm = (): void => {
        type diffStateKeyType = keyof typeof diffState;
        for (const key in diffState) {
            diffState[key as diffStateKeyType].prevValue = diffState[key as diffStateKeyType].value;
            diffState[key as diffStateKeyType].value = name;
        }

        diffState.name.value = name;
        diffState.surname.value = surname;
        diffState.city.value = city;

        for (const key in diffState) {
            diffState[key as diffStateKeyType].hasChanged =
                diffState[key as diffStateKeyType].prevValue !== diffState[key as diffStateKeyType].value;
        }

        setShowModal(true);
        setDiffFormState(diffState);
    };

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
                        <Input
                            placeholder="Введите имя пользователя"
                            id="name"
                            type="text"
                            value={name}
                            onValueChange={onChangeValue(FormDataEnum.name)}
                        />
                    </div>
                    <div>
                        <label htmlFor="surname" className="label">
                            Фамилия
                        </label>
                        <Input
                            placeholder="Введите фамилию пользователя"
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
                            placeholder="Выберите город"
                            items={getCities()}
                            onValueChange={onChangeValue(FormDataEnum.city)}
                        />
                    </div>
                    <Button use="primary" onClick={() => onSaveForm()}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
            {showModal && <ModalComponent closeModal={() => onCloseModal()} diffState={diffFormState} />}
        </>
    );
};
