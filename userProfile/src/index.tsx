import './style.css';
import React from 'react';
import ReactDom from 'react-dom';
import {Button, Input, Select, Gapped, Modal} from '@skbkontur/react-ui';

type FormData = {
    name: string;
    surname: string;
    city: string;
}

const defaultFormData = {
    name: '',
    surname: '',
    city: ''
}

type CreateFormProps = {}

type CreateFormState = {
    isModalOpened: boolean;
    savedData: FormData;
    currentData: FormData;
    fieldValidation: { name: boolean, surname: boolean };
}

class CreateForm extends React.Component<CreateFormProps, CreateFormState> {
    constructor(props: CreateFormProps) {
        super(props);
        this.state = {
            isModalOpened: false,
            savedData: {...defaultFormData},
            currentData: {...defaultFormData},
            fieldValidation: {
                name: false,
                surname: false
            }
        }
    }

    renderChangeData(field: keyof FormData) {
        const currentData = this.state.currentData;
        const savedData = this.state.savedData;

        return (savedData[field] !== currentData[field] &&
            <div>{field}: было {savedData[field] || 'неизвестно'}, стало {currentData[field]}</div>);
    }

    renderModal() {
        return (
            <Modal onClose={this.closeModalAndSaveData}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>
                    <div>
                        Измененные данные:
                        {this.renderChangeData('name')}
                        {this.renderChangeData('surname')}
                        {this.renderChangeData('city')}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModalAndSaveData}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    closeModalAndSaveData = () => {
        this.setState({
            isModalOpened: false,
            savedData: {...this.state.currentData}
        });
    }

    openModal = () => {
        this.setState({
            isModalOpened: true
        });
    }

    checkValidation = () => {
        if (this.state.currentData.name && this.state.currentData.surname)
            this.openModal();
    }

    changeFormData(value: string, field: string) {
        this.setState({
            currentData: {
                ...this.state.currentData,
                [field]: value,
            }
        })
    }

    renderForm() {
        return (
            <form>
                <h2>Информация о пользователе</h2>
                <Gapped gap={15} vertical>
                    <div className='row'>
                        <label htmlFor='name'>
                            <div className='label'>Имя</div>
                            <Input
                                type='text'
                                id='name'
                                placeholder='Введите имя пользователя'
                                onValueChange={value => this.changeFormData(value, 'name')}
                                error={this.state.currentData.name === '' && true}
                            />
                        </label>
                    </div>
                    <div className='row'>
                        <label htmlFor='surname'>
                            <div className='label'>Фамилия</div>
                            <Input
                                type='text'
                                id='surname'
                                placeholder='Введите фамилию пользователя'
                                onValueChange={value => this.changeFormData(value, 'surname')}
                                error={this.state.currentData.surname === '' && true}
                            />
                        </label>
                    </div>
                    <div className='row'>
                        <label>
                            <div className='label'>Город</div>
                            <Select<string>
                                items={['Екатеринбург', 'Тюмень', 'Челябинск', 'Курган']}
                                placeholder='Выберите город'
                                onValueChange={value => this.changeFormData(value, 'city')}
                            />
                        </label>
                    </div>
                    <Button use="primary" onClick={this.checkValidation}>Сохранить</Button>
                </Gapped>
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.state.isModalOpened && this.renderModal()}
            </div>
        );
    }
}


ReactDom.render(
    <CreateForm/>,
    document.getElementById('app')
);

