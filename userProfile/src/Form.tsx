import React from 'react';
import { Button, Gapped } from '@skbkontur/react-ui';

import { FormField, FormFieldProps } from './FormField';

type FormProps = {
    fields: FormFieldProps[];
    onSubmit: () => void;
};

export const Form: React.FC<FormProps> = ({ fields, onSubmit }) => {
    return (
        <form>
            <Gapped vertical gap={15}>
                {fields.map(field => <FormField key={field.id} {...field} />)}
                <Button use='primary' onClick={onSubmit}>Сохранить</Button>
            </Gapped>
        </form>
    );
};