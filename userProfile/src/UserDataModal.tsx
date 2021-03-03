import React from "react";
import {Button, Modal} from "@skbkontur/react-ui";

type FormData = {
    name: string;
    surname: string;
    city: string;
    sex: string;
    dateOfBirth: string,
    cityOfBirth: string,
    maritalStatus: string,
    citizenship: string,
    nationality: string,
    phoneNumber: string,
    email: string,
}

type UserDataModalProps = {
    closeModalAndSaveData: () => void;
    savedData: FormData;
    currentData: FormData;
}

class UserDataModal extends React.Component<UserDataModalProps, {}> {
    constructor(props: UserDataModalProps) {
        super(props);
    }

    render() {
        return (
            <Modal onClose={this.props.closeModalAndSaveData}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>
                    <div>
                        Измененные данные:
                        {this.renderChangeData('name', 'Имя')}
                        {this.renderChangeData('surname', 'Фамилия')}
                        {this.renderChangeData('city', 'Город')}
                        {this.renderChangeData('sex', 'Пол')}
                        {this.renderChangeData('dateOfBirth', 'Дата рождения')}
                        {this.renderChangeData('cityOfBirth', 'Город рождения')}
                        {this.renderChangeData('maritalStatus', 'Семейное положение')}
                        {this.renderChangeData('citizenship', 'Гражданство')}
                        {this.renderChangeData('nationality', 'Национальность')}
                        {this.renderChangeData('phoneNumber', 'Номер телефона')}
                        {this.renderChangeData('email', 'Электронная почта')}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.closeModalAndSaveData}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    renderChangeData(field: keyof FormData, fieldName: string) {
        const currentData = this.props.currentData;
        const savedData = this.props.savedData;

        return (savedData[field] !== currentData[field] &&
            <div className='modalRow'>
                {fieldName}: {savedData[field] || '*неизвестно*'} ---{'>'} {currentData[field]}
            </div>);
    }
}

export default UserDataModal;