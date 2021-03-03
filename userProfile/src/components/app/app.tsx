import React, { useState } from 'react';
import { Button, Gapped, Input, Select, Modal } from '@skbkontur/react-ui';

const CITIES = [`Москва`, `Санкт-Петербург`, `Екатеринбург`, `Новосибирск`, `Владивосток`, `Иннополис`];

type FormState = {
    firstname: string;
    lastname: string;
    city: string;
};

const App = () => {
    const [isOpened, setIsOpened] = useState(false);
    const [state, setState] = useState({
        firstname: ``,
        lastname: ``,
        city: ``
    });
    const [prevState, setPrevState] = useState(state);
    const [modalMsg, setModalMsg] = useState<string[]>([]);

    const renderModal = (message: string[]) => {
        return (
            <Modal onClose={handleModalClose}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                {message.length !== 0 && (
                    <Modal.Body>
                        <p>Измененные данные:</p>
                        {message.map(msg => (
                            <p key={msg.length}>{msg}</p>
                        ))}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button onClick={handleModalClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };

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
        setIsOpened(false);
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
        setIsOpened(true);
        setPrevState(state);
    };

    return (
        <>
            {isOpened && renderModal(modalMsg)}
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
