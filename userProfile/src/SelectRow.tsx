import { SelectProps } from './types';
import { Gapped, Select } from '@skbkontur/react-ui';
import React from 'react';

const SelectRow = ({ title, onInputChange }: SelectProps) => {
    const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург'];
    return (
        <div className="inputRow">
            <Gapped gap={20}>
                <p className="title">{title}</p>
                <Select<string>
                    items={cities}
                    placeholder="Выберете город"
                    onValueChange={value => {
                        onInputChange(value);
                    }}
                />
            </Gapped>
        </div>
    );
};

export default SelectRow;
