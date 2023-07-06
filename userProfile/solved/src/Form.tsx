import React from 'react';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';

type FormData = {
    name: string;
    surname: string;
    city: string;
};

const defaultData = {
    name: '',
    surname: '',
    city: 'Екатеринбург'
};

const cities = ['Москва', 'Урюпинск', 'Новосибирск', 'Екатеринбург', 'Тагиииил'];

export default function Form() {
    const [modalOpened, setModalOpened] = React.useState(false);
    const [saved, setSaved] = React.useState(defaultData);
    const [current, setCurrent] = React.useState(defaultData);

    const renderForm = () => {
        const { name, surname, city } = current;
        return (
            <form>
                <Gapped gap={15} vertical>
                    <label>
                        <div className="label">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={name}
                            onValueChange={onChange('name')}
                            width={250}
                        />
                    </label>
                    <label>
                        <div className="label">Фамилия</div>
                        <Input
                            placeholder="Введите фамилию пользователя"
                            value={surname}
                            onValueChange={onChange('surname')}
                            width={250}
                        />
                    </label>
                    <label>
                        <div className="label">Город</div>
                        <Select<string>
                            placeholder="Выберите город"
                            items={cities}
                            value={city}
                            onValueChange={onChange('city')}
                        />
                    </label>
                    <Button use="primary" size="large" onClick={openModal}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    };

    const renderModal = () => {
        const isNothingChanged = (Object.keys(current) as (keyof FormData)[]).every(key => saved[key] === current[key]);
        return (
            <Modal onClose={closeModal}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                {isNothingChanged ? null : (
                    <Modal.Body>
                        <p>Измененные данные:</p>
                        {renderChanges()}
                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button onClick={closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    const renderChanges = () => {
        return (
            <p>
                {renderDiff('name', 'Имя')}
                {renderDiff('surname', 'Фамилия')}
                {renderDiff('city', 'Город')}
            </p>
        );
    };

    const renderDiff = (field: keyof FormData, fieldName: string) => {
        if (current[field] === saved[field]) {
            return null;
        }

        return (
            <React.Fragment>
                {fieldName}: было {saved[field] || '*ничего*'}, стало {current[field] || '*ничего*'} <br />
            </React.Fragment>
        );
    };

    const openModal = () => {
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
        setSaved({ ...current });
    };

    const onChange = (field: keyof FormData) => {
        return (value: string) => {
            setCurrent(current => ({ ...current, [field]: value }));
        };
    };

    return (
        <div>
            <h2>Информация о пользователе</h2>
            {renderForm()}
            {modalOpened && renderModal()}
        </div>
    );
}
