import React from 'react';
import { Gapped, Input, Select, Group } from '@skbkontur/react-ui';

import { FieldType } from './common-types';

const cities = [
    'Екатеринбург',
    'Москва',
    'Санкт-Петербург',
    'Воронеж',
    'Сочи',
];

export type FormFieldProps = {
    id: string;
    labelValue: string;
    placeholder: string;
    type?: FieldType;
    onValueChange: (value: string) => void;
};

export const FormField: React.FC<FormFieldProps> = (props) => {
    const { id, labelValue, placeholder, type = FieldType.Input, onValueChange } = props;

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange(e.target.value);
    };

    const onChangeSelect = (value: Object) => {
        onValueChange(value as string);
    };

    const getField = (fieldType: FieldType) => {
        switch (fieldType) {
            case FieldType.Input:
                return  <Input id={id} placeholder={placeholder} onChange={onChangeInput} />;
            case FieldType.Select:
                return <Select placeholder={placeholder} items={cities} onValueChange={onChangeSelect} />;
        }
    };

    return (
        <div>
            <Group>
                <Gapped gap={40}>
                    <label className='form__label' htmlFor={id}>{labelValue}</label>
                    {getField(type)}
                </Gapped>
            </Group>
        </div>
    );
};