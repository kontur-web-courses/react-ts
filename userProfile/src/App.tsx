import React, {RefObject} from 'react';
import ReactDom from 'react-dom';
import {Input} from '@skbkontur/react-ui';
import UserDataModal from './UserDataModal';
import Form from "./Form";

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

const defaultFormData = {
    name: '',
    surname: '',
    city: '',
    sex: '',
    dateOfBirth: '',
    cityOfBirth: '',
    maritalStatus: '',
    citizenship: '',
    nationality: '',
    phoneNumber: '',
    email: '',
}

type AppState = {
    isModalOpened: boolean;
    savedData: FormData;
    currentData: FormData;
    fieldValidation: { name: boolean, surname: boolean };
}

class App extends React.Component<{}, AppState> {
    private inputNameRef = React.createRef<Input>();
    private inputSurnameRef = React.createRef<Input>();

    constructor(props: {}) {
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

    render() {
        return (
            <div>
                {<Form
                    inputNameRef={this.inputNameRef}
                    inputSurnameRef={this.inputSurnameRef}
                    changeFormData={this.changeFormData}
                    checkValidation={this.checkValidation}
                />}
                {this.state.isModalOpened &&
                <UserDataModal
                    closeModalAndSaveData={this.closeModalAndSaveData}
                    currentData={this.state.currentData}
                    savedData={this.state.savedData}
                />}
            </div>
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
        if (!this.state.currentData.name)
            this.inputNameRef.current?.blink();
        if (!this.state.currentData.surname)
            this.inputSurnameRef.current?.blink();
    }

    changeFormData = (value: string, field: string) => {
        this.setState({
            currentData: {
                ...this.state.currentData,
                [field]: value,
            }
        })
    }
}

export default App;