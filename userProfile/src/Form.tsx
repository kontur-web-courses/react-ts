import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import React, { useRef, useState } from 'react';
import FormModal from './FormModal';
import Label from './Label';

interface Props {
    title: string;
}

interface FieldValues {
    name: string;
    surname: string;
    city: string;
}

const defaultFieldsValues: FieldValues = {
    name: '',
    surname: '',
    city: 'Москва'
};

const FieldLabels = {
    name: 'Имя',
    surname: 'Фамилия',
    city: 'Город'
};

const selectOptions = ['Москва', 'Урюпинск', 'Новосибирск', 'Екатеринбург', 'Тагиииил'];

const Form: React.FC<Props> = ({ title }: Props) => {
    const savedState = useRef<FieldValues>(defaultFieldsValues);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(defaultFieldsValues.name);
    const [surname, setSurname] = useState(defaultFieldsValues.surname);
    const [city, setCity] = useState(defaultFieldsValues.city);
    const handleModalClose = () => {
        savedState.current = { name, surname, city };
        setOpen(false);
    };
    const showDiff = (field: string, oldVal: string, newVal: string) => {
        if (oldVal !== newVal) {
            return `${field}: было "${oldVal || 'пустое поле'}", стало "${newVal || 'пустое поле'}"`;
        }
        return null;
    };
    const isDataChanged = () =>
        name !== savedState.current.name || surname !== savedState.current.surname || city !== savedState.current.city;

    return (
        <div>
            <h2>{title}</h2>
            <form>
                <Gapped gap={15} vertical>
                    <Label name={FieldLabels.name}>
                        <Input value={name} onValueChange={val => setName(val)} />
                    </Label>
                    <Label name={FieldLabels.surname}>
                        <Input value={surname} onValueChange={val => setSurname(val)} />
                    </Label>
                    <Label name={FieldLabels.city}>
                        <Select<string>
                            value={city}
                            items={selectOptions}
                            onValueChange={(val: string) => setCity(val)}
                        />
                    </Label>
                    <Button use="primary" size="large" onClick={() => setOpen(true)}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
            <FormModal open={open} onClose={handleModalClose}>
                <div>{isDataChanged() ? 'Измененные данные:' : 'Данные не изменены'}</div>
                <div>{showDiff(FieldLabels.name, savedState.current.name, name)}</div>
                <div>{showDiff(FieldLabels.surname, savedState.current.surname, surname)}</div>
                <div>{showDiff(FieldLabels.city, savedState.current.city, city)}</div>
            </FormModal>
        </div>
    );
};

export default Form;
