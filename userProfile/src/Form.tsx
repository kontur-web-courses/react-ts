import React, {RefObject} from "react";
import {Button, Gapped, Input, Select} from "@skbkontur/react-ui";

const cities = ['Екатеринбург', 'Тюмень', 'Челябинск', 'Курган'];

type FormProps = {
    inputNameRef: RefObject<Input>;
    inputSurnameRef: RefObject<Input>;
    changeFormData: (value: string, field: string) => void;
    checkValidation: () => void;
}

function Form(props: FormProps) {
    return (
        <form>
            <h2>Информация о пользователе</h2>
            <Gapped gap={15} vertical>
                <div className='row'>
                    <label>
                        <div className='label'>Имя</div>
                        <Input
                            ref={props.inputNameRef}
                            type='text'
                            placeholder='Введите имя пользователя'
                            onValueChange={value => props.changeFormData(value, 'name')}
                        />
                    </label>
                </div>
                <div className='row'>
                    <label>
                        <div className='label'>Фамилия</div>
                        <Input
                            ref={props.inputSurnameRef}
                            type='text'
                            placeholder='Введите фамилию пользователя'
                            onValueChange={value => props.changeFormData(value, 'surname')}
                        />
                    </label>
                </div>
                <SelectFormRow
                    label='Город'
                    items={cities}
                    placeholder='Выберите город'
                    onValueChange={value => props.changeFormData(value, 'city')}
                />
                <SelectFormRow
                    label='Пол'
                    items={['мужчина', 'женщина', 'не определился']}
                    placeholder='Введите пол'
                    onValueChange={value => props.changeFormData(value, 'sex')}
                />
                <InputFormRow
                    label='Дата рождения'
                    //Насколько я поняла, Input из React UI может иметь тип только text или password :(
                    type='text'
                    placeholder='Введите дату рождения'
                    onValueChange={value => props.changeFormData(value, 'dateOfBirth')}
                />
                <SelectFormRow
                    label='Город рождения'
                    items={cities}
                    placeholder='Выберите город рождения'
                    onValueChange={value => props.changeFormData(value, 'cityOfBirth')}
                />
                <SelectFormRow
                    label='Семейное положение'
                    items={['Свободен', 'В браке']}
                    placeholder='Выберите семейное положение'
                    onValueChange={value => props.changeFormData(value, 'maritalStatus')}
                />
                <SelectFormRow
                    label='Гражданство'
                    items={['РФ', 'США']}
                    placeholder='Выберите гражданство'
                    onValueChange={value => props.changeFormData(value, 'citizenship')}
                />
                <InputFormRow
                    label='Национальность'
                    type='text'
                    placeholder='Введите национальность'
                    onValueChange={value => props.changeFormData(value, 'nationality')}
                />
                <InputFormRow
                    label='Номер телефона'
                    type='text'
                    placeholder='Введите номер телефона'
                    onValueChange={value => props.changeFormData(value, 'phoneNumber')}
                />
                <InputFormRow
                    label='E-mail'
                    type='text'
                    placeholder='Введите адрес электронной почты'
                    onValueChange={value => props.changeFormData(value, 'email')}
                />
                <Button use="primary" onClick={props.checkValidation}>Сохранить</Button>
            </Gapped>
        </form>
    );
}

type FormRowProps = {
    label: string;
    type?: 'text' | 'password' | undefined;
    items?: string[];
    placeholder: string;
    onValueChange: (value: string) => void;
};

function InputFormRow(props: FormRowProps) {
    const {label, ...rest} = props;
    return (
        <div className='row'>
            <label>
                <div className='label'>{label}</div>
                <Input {...rest}/>
            </label>
        </div>
    );
}

function SelectFormRow(props: FormRowProps) {
    const {label, ...rest} = props;
    return (
        <div className='row'>
            <label>
                <div className='label'>{label}</div>
                <Select<string>{...rest}/>
            </label>
        </div>
    );
}

export default Form;