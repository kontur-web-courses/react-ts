import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import React, { useState } from 'react';
import { FormData, defaultData } from './Form';

type TFormProps = {
    data: FormData;
    onSubmit: Function;
};

const cities: string[] = ['Екатеринбург', 'Н.Тагил', 'Москва', 'Санкт-Петербург', 'Казань'];

const RenderModal = (props: TFormProps) => {
    const [person, setPerson] = useState({ ...defaultData });

    const handlerField = (field: keyof FormData, value: string) => {
        setPerson({ ...person, [field]: value });
    };

    const submitForm = () => {
        props.onSubmit(person);
    };

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

export default RenderModal;
