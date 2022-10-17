import React, { Dispatch, ReactComponentElement, ReactNode, SetStateAction, useState } from 'react';
import { Button, Gapped, Input, Modal, Select } from '@skbkontur/react-ui';

const cities = ['Екатеринбург', 'Анти-Екатеринбург'];

function toggleModal(modalHidden: boolean, setModalHidden: (a: boolean) => void) {
    setModalHidden(!modalHidden);
}

function handleChange(value: string, name: string[], setName: Dispatch<SetStateAction<string[]>>) {
    setName(name.concat(value));
}

type ChangedData = { title: string; value: string[] };

const ChangedData = ({ title, value }: ChangedData) => (
    <p style={{ display: value.length < 2 ? 'none' : 'flex' }}>
        {title}: было {value[value.length - 2]} стало {value[value.length - 1]}
    </p>
);

export const Form = () => {
    const [modalHidden, setModalHidden] = useState(true);
    const [name, setName] = useState<string[]>([]);
    return (
        <div>
            <h3>Информация о пользователе</h3>
            <form>
                <Gapped gap={15} vertical>
                    <label>
                        <div className="label">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            onValueChange={value => handleChange(value, name, setName)}
                        />
                    </label>
                    {/*<label>*/}
                    {/*    <div className="label">Фамилия</div>*/}
                    {/*    <Input*/}
                    {/*        placeholder="Введите фамилию пользователя"*/}
                    {/*        onValueChange={value => handleChange(value)}*/}
                    {/*    />*/}
                    {/*</label>*/}
                    <label>
                        <div className="label">Город</div>
                        <Select
                            placeholder="Выберите город"
                            items={cities}
                            // onValueChange={(value) => handleChange(value)}
                        />
                    </label>
                    <Button use="primary" onClick={() => toggleModal(modalHidden, setModalHidden)}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
            {!modalHidden && (
                <Modal>
                    <Modal.Header>Пользователь сохранен</Modal.Header>
                    <Modal.Body>
                        <p>Измененные данные:</p>
                        <ChangedData title="Имя" value={name} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => toggleModal(modalHidden, setModalHidden)}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};
