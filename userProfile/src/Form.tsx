import React, { useState } from 'react';
import { Button, Gapped, Input, Modal, Select } from '@skbkontur/react-ui';
import { ChangedData } from './ChangedData';

type FormData = {
    name: string;
    lastName: string;
    city: string;
};

type PageData = {
    modalHidden: boolean;
    saved: FormData;
    current: FormData;
};

const defaultFormData = {
    name: '',
    lastName: '',
    city: ''
};

const cities = ['Екатеринбург', 'Анти-Екатеринбург'];

function showModal(data: PageData, setData: (value: PageData) => void) {
    if (Object.values(data.current).every(element => element)) setData({ ...data, modalHidden: false });
}

function hideModal(data: PageData, setData: (value: PageData) => void) {
    setData({ ...data, modalHidden: true, saved: data.current });
}

function handleChange(data: PageData, setData: (value: PageData) => void, value: string, field: string) {
    setData({ ...data, current: { ...data.current, [field]: value } });
}

export const Form = () => {
    const [data, setData] = useState({
        modalHidden: true,
        saved: { ...defaultFormData },
        current: { ...defaultFormData }
    });
    return (
        <div>
            <h3>Информация о пользователе</h3>
            <form>
                <Gapped gap={15} vertical>
                    <label>
                        <div className="label">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            onValueChange={(value: string) => handleChange(data, setData, value, 'name')}
                        />
                    </label>
                    <label>
                        <div className="label">Фамилия</div>
                        <Input
                            placeholder="Введите фамилию пользователя"
                            onValueChange={(value: string) => handleChange(data, setData, value, 'lastName')}
                        />
                    </label>
                    <label>
                        <div className="label">Город</div>
                        <Select<string>
                            placeholder="Выберите город"
                            items={cities}
                            onValueChange={(value: string) => handleChange(data, setData, value, 'city')}
                        />
                    </label>
                    <Button use="primary" onClick={() => showModal(data, setData)}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
            {!data.modalHidden && (
                <Modal onClose={() => hideModal(data, setData)}>
                    <Modal.Header>Пользователь сохранен</Modal.Header>
                    <Modal.Body>
                        <p>Измененные данные:</p>
                        <ChangedData title="Имя" oldValue={data.saved.name} newValue={data.current.name} />
                        <ChangedData title="Фамилия" oldValue={data.saved.lastName} newValue={data.current.lastName} />
                        <ChangedData title="Город" oldValue={data.saved.city} newValue={data.current.city} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => hideModal(data, setData)}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
