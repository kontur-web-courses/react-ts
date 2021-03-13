import React, { RefObject } from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import UserBio from './UserBio';
import { formFields } from './formFields';

export type FormData = {
    name: string;
    surname: string;
    city: string;
    sex: string;
    dateOfBirth: string;
    cityOfBirth: string;
    maritalStatus: string;
    citizenship: string;
    nationality: string;
    phoneNumber: string;
    email: string;
    [index: string]: string;
};

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
    email: ''
};

type FormState = {
    isModalOpened: boolean;
    savedData: FormData;
    currentData: FormData;
    fieldValidation: { name: boolean; surname: boolean };
};

export class Form extends React.Component<{}, FormState> {
    private inputNameRef = React.createRef<Input>();
    private inputSurnameRef = React.createRef<Input>();

    constructor(props: {}) {
        super(props);
        this.state = {
            isModalOpened: false,
            savedData: { ...defaultFormData },
            currentData: { ...defaultFormData },
            fieldValidation: {
                name: false,
                surname: false
            }
        };
    }

    openModal = () => {
        this.setState({
            isModalOpened: true
        });
    };

    closeModel = () => {
        this.setState({
            isModalOpened: false
        });
    };

    closeModalAndSaveData = () => {
        this.setState({
            isModalOpened: false,
            savedData: this.state.currentData
        });
    };

    openModalOrHighlightErrors = () => {
        if (this.state.currentData.name && this.state.currentData.surname) this.openModal();
        if (!this.state.currentData.name) this.inputNameRef.current?.blink();
        if (!this.state.currentData.surname) this.inputSurnameRef.current?.blink();
    };

    changeFormData = (value: string, field: keyof FormData) => {
        this.setState({
            currentData: {
                ...this.state.currentData,
                [field]: value
            }
        });
    };

    renderForm() {
        const fields = [];
        for (const fieldName in formFields) {
            const field = formFields[fieldName];
            fields.push(
                <label key={field.fieldName}>
                    <span className="label">{field.label}</span>
                    {field.elementType === 'input' ? (
                        <Input
                            ref={
                                field.fieldName === 'name'
                                    ? this.inputNameRef
                                    : field.fieldName === 'surname'
                                    ? this.inputSurnameRef
                                    : null
                            }
                            type="text"
                            placeholder={field.placeholder}
                            onValueChange={value => this.changeFormData(value, field.fieldName)}
                        />
                    ) : (
                        <Select<string>
                            items={field.items}
                            placeholder={field.placeholder}
                            onValueChange={value => this.changeFormData(value, field.fieldName)}
                        />
                    )}
                </label>
            );
        }

        return (
            <form>
                <h1>Информация о пользователе</h1>
                <Gapped gap={16} vertical>
                    {fields}
                    <Button use="primary" onClick={this.openModalOrHighlightErrors}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.renderForm()}
                {this.state.isModalOpened && (
                    <UserBio
                        closeModalAndSaveData={this.closeModalAndSaveData}
                        closeModal={this.closeModel}
                        currentData={this.state.currentData}
                        savedData={this.state.savedData}
                    />
                )}
            </div>
        );
    }
}
