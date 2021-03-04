/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import CustomModal from '../custom-modal/custom-modal';
import Form from '../form/form';
import { FormState } from '../../types';

const CITIES = [`Москва`, `Санкт-Петербург`, `Екатеринбург`, `Новосибирск`, `Владивосток`, `Иннополис`];

const initialState: FormState = {
    firstname: ``,
    lastname: ``,
    city: ``
};

const App = () => {
    const [state, setState] = useState(initialState);
    const [prevState, setPrevState] = useState(initialState);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMsg, setModalMsg] = useState<string[]>([]);

    const getModalMessage = (state: FormState, prevState: FormState) => {
        const result = [];
        for (const key of Object.keys(state) as (keyof FormState)[]) {
            if (state[key] !== prevState[key]) {
                let message = ``;
                switch (key) {
                    case `firstname`:
                        message += `Имя: `;
                        break;
                    case `lastname`:
                        message += `Фамилия: `;
                        break;
                    case `city`:
                        message += `Город: `;
                        break;
                }
                message += `было ${prevState[key] || `не задано`}, стало ${state[key]}\n`;
                result.push(message);
            }
        }

        return result;
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleValueChange = (field: keyof FormState) => {
        return (value: string) => {
            setState({
                ...state,
                [field]: value
            });
        };
    };

    const handleSaveButtonClick = () => {
        setModalMsg(getModalMessage(state, prevState));
        setIsModalOpen(true);
        setPrevState(state);
    };

    return (
        <>
            {isModalOpen && <CustomModal message={modalMsg} onClose={handleModalClose} />}
            <h2>Информация о пользователе</h2>
            <Form
                cities={CITIES}
                state={state}
                onChange={handleValueChange}
                onSave={handleSaveButtonClick}
            />
        </>
    );
};

export default App;
