import React from 'react';
import { Button, Gapped, Modal } from '@skbkontur/react-ui';
import { FormData } from './Form';
import { formFields } from './formFields';

type UserDataModalProps = {
    closeModalAndSaveData: () => void;
    closeModal: () => void;
    savedData: FormData;
    currentData: FormData;
};

function UserBio(props: UserDataModalProps) {
    const { closeModal, currentData, savedData, closeModalAndSaveData } = props;
    return (
        <Modal onClose={closeModal}>
            <Modal.Header>Сохранить данные?</Modal.Header>
            <Modal.Body>
                <ChangedData currentData={currentData} savedData={savedData} />
            </Modal.Body>
            <Modal.Footer>
                <Button use="primary" onClick={closeModalAndSaveData}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

function ChangedData(props: { currentData: FormData; savedData: FormData }) {
    const { currentData, savedData } = props;
    const changedData = [];
    for (const field in currentData) {
        if (currentData[field] !== savedData[field]) {
            changedData.push(
                <div className="changedData" key={field}>
                    {formFields[field].label}: {savedData[field] !== '' ? savedData[field] : '*неизвестно*'} ---{'> '}
                    {currentData[field]}
                </div>
            );
        }
    }

    return (
        <Gapped gap={16} vertical>
            Измененные данные:
            {changedData.length > 0 ? changedData : '*нет изменений*'}
        </Gapped>
    );
}

export default UserBio;
