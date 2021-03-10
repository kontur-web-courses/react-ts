import React, { useState } from 'react';
import RenderForm from './RenderForm';
import RenderModal from './RenderModal';

export interface FormData {
    name: string;
    surname: string;
    city: string | undefined;
}

export const defaultData: FormData = {
    name: '',
    surname: '',
    city: undefined
};

const savedData: FormData = { ...defaultData };

const Form = () => {
    const [newPerson, setNewPerson] = useState({ ...defaultData });
    const [opened, setOpened] = useState(false);

    const updatePerson = (data: FormData) => {
        setNewPerson({ ...newPerson, ...data });
        setOpened(true);
    };

    const closeModal = (data: boolean) => {
        setOpened(data);
    };

    return (
        <>
            <h2>Информация о пользователе</h2>
            <RenderForm data={newPerson} onSubmit={updatePerson} />
            {opened && <RenderModal savedData={savedData} person={newPerson} onClose={closeModal} />}
        </>
    );
};

export default Form;
