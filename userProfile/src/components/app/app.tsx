import React, { useState } from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import CustomModal from '../custom-modal/custom-modal';

const CITIES = [`Москва`, `Санкт-Петербург`, `Екатеринбург`, `Новосибирск`, `Владивосток`, `Иннополис`];

type FormState = {
    firstname: string;
    lastname: string;
    city: string;
};

const initialState: FormState = {
    firstname: ``,
    lastname: ``,
    city: ``
};

const App = () => {
    const [state, setState] = useState(initialState);
    const [prevState, setPrevState] = useState(initialState);
    const [isModalOpened, setIsModalOpened] = useState(false);
    const [modalMsg, setModalMsg] = useState<string[]>([]);

    const equal = (state: any, prevState: any) => {
        const result = [];
        for (const key of Object.keys(state)) {
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
        setIsModalOpened(false);
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
        setModalMsg(equal(state, prevState));
        setIsModalOpened(true);
        setPrevState(state);
    };

    return (
        <>
            {isModalOpened && <CustomModal message={modalMsg} onClose={handleModalClose} />}
            <h2>Информация о пользователе</h2>
            <form>
                <Gapped vertical gap={15}>
                    <label htmlFor="firstname">
                        <span className="label">Имя</span>
                        <Input
                            id="firstname"
                            placeholder="Введите имя"
                            value={state.firstname}
                            onValueChange={handleValueChange(`firstname`)}
                        />
                    </label>

                    <label htmlFor="lastname">
                        <span className="label">Фамилия</span>
                        <Input
                            id="lastname"
                            placeholder="Введите фамилию"
                            value={state.lastname}
                            onValueChange={handleValueChange(`lastname`)}
                        />
                    </label>

                    <label htmlFor="city">
                        <span className="label">Город</span>
                        <Select<string>
                            items={CITIES}
                            placeholder="Выберите город"
                            value={state.city}
                            onValueChange={handleValueChange(`city`)}
                        />
                    </label>
                    <Button use="primary" onClick={handleSaveButtonClick}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        </>
    );
};

export default App;
