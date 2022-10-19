import { RowProps } from './types';
import { Gapped, Input } from '@skbkontur/react-ui';
import React from 'react';

const InputRow = ({ title, placeholder = '', onInputChange, isError }: RowProps) => {
    return (
        <div className="inputRow">
            <Gapped gap={20}>
                <p className="title">{title}</p>
                <div>
                    <Input placeholder={placeholder} onChange={e => onInputChange(e.target.value)} />
                    {isError && <p className="error-message">Заполните поле</p>}
                </div>
            </Gapped>
        </div>
    );
};

export default InputRow;
