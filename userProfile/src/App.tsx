import React, { useReducer, useState } from 'react';

import { Change, FieldType } from './common-types';
import { FormSuccessModal } from './FormSuccessModal';
import { Form } from './Form';

import './style.css';

enum FormChangeActionType {
    NAME_CHANGE = 'NAME_CHANGE',
    LAST_NAME_CHANGE = 'LAST_NAME_CHANGE',
    CITY_CHANGE = 'CITY_CHANGE',
    SAVE = 'SAVE',
}

type FormChangeAction = {
    type: FormChangeActionType;
    value?: string;
};

type FieldName = 'name' | 'lastName' | 'city';

type AppState = Record<FieldName, Change>;

const appReducer = (state: AppState, action: FormChangeAction) => {
    switch (action.type) {
        case FormChangeActionType.NAME_CHANGE:
            const { name } = state;
            state.name = { ...name, after: action.value! };

            return state;
        case FormChangeActionType.LAST_NAME_CHANGE:
            const { lastName } = state;
            state.lastName = { ...lastName, after: action.value! };

            return state;
        case FormChangeActionType.CITY_CHANGE:
            const { city } = state;
            state.city = { ...city, after: action.value! };

            return state;
        case FormChangeActionType.SAVE:
            for (const field in state) {
                const castedField = field as FieldName;

                state[castedField] = { ...state[castedField], before: state[castedField].after };
            }
        default:
            return state;
    }
}

const getDefaultChange = (fieldName: string): Change => ({
    before: '',
    after: '',
    fieldName,
});

const initialSate: AppState = {
    name: getDefaultChange('Имя'),
    lastName: getDefaultChange('Фамилия'),
    city: getDefaultChange('Город'),
};

export const App: React.FC = () => {
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ changes, dispatch ] = useReducer(appReducer, initialSate);

    const formFields = [
        {
            id: 'name',
            labelValue: 'Имя',
            placeholder: 'Введите имя пользователя',
            onValueChange: (value: string) => dispatch({ type: FormChangeActionType.NAME_CHANGE, value }),
        },
        {
            id: 'lastName',
            labelValue: 'Фамилия',
            placeholder: 'Введите фамилию пользователя',
            onValueChange: (value: string) => dispatch({ type: FormChangeActionType.LAST_NAME_CHANGE, value }),
        },
        {
            id: 'city',
            labelValue: 'Город',
            placeholder: 'Выберите город',
            type: FieldType.Select,
            onValueChange: (value: string) => dispatch({ type: FormChangeActionType.CITY_CHANGE, value }),
        },
    ];

    const onSubmit = () => {
        setIsModalOpen(true);
    };

    const onClose = () => {
        dispatch({ type: FormChangeActionType.SAVE });
        setIsModalOpen(false);
    };

    const filterChanges = () => {
        return Object.values(changes).filter(change => change.before !== change.after);
    };

    return (
        <>
            {isModalOpen && <FormSuccessModal close={onClose} changes={filterChanges()} />}
            <div>
                <h1>Информация о пользователе</h1>
                <Form fields={formFields} onSubmit={onSubmit} />
            </div>
        </>
    );
};