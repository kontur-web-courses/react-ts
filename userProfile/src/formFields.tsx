import { FormData } from './Form';

type FormField = {
    label: string;
    placeholder: string;
    fieldName: keyof FormData;
    items?: string[];
    elementType: 'input' | 'select';
};

export const formFields: { [key in keyof FormData]: FormField } = {
    name: {
        label: 'Имя',
        placeholder: 'Введите имя пользователя',
        fieldName: 'name',
        elementType: 'input'
    },
    surname: {
        label: 'Фамилия',
        placeholder: 'Введите фамилию пользователя',
        fieldName: 'surname',
        elementType: 'input'
    },
    city: {
        label: 'Город',
        placeholder: 'Выберите город',
        fieldName: 'city',
        elementType: 'select',
        items: ['Екатеринбург', 'Тюмень', 'Челябинск', 'Курган']
    },
    sex: {
        label: 'Пол',
        placeholder: 'Выберите пол',
        fieldName: 'sex',
        elementType: 'select',
        items: ['мужчина', 'женщина', 'не определился']
    },
    dateOfBirth: {
        label: 'Дата рождения',
        placeholder: 'Введите дату рождения',
        fieldName: 'dateOfBirth',
        elementType: 'input'
    },
    cityOfBirth: {
        label: 'Город рождения',
        placeholder: 'Выберите город рождения',
        fieldName: 'cityOfBirth',
        elementType: 'select',
        items: ['Екатеринбург', 'Тюмень', 'Челябинск', 'Курган']
    },
    maritalStatus: {
        label: 'Семейное положение',
        placeholder: 'Выберите семейное положение',
        fieldName: 'maritalStatus',
        elementType: 'select',
        items: ['Свободен', 'В браке']
    },
    citizenship: {
        label: 'Гражданство',
        placeholder: 'Выберите Гражданство',
        fieldName: 'citizenship',
        elementType: 'select',
        items: ['РФ', 'США']
    },
    nationality: {
        label: 'Национальность',
        placeholder: 'Введите национальность',
        fieldName: 'nationality',
        elementType: 'input'
    },
    phoneNumber: {
        label: 'Номер телефона',
        placeholder: 'Введите номер телефона',
        fieldName: 'phoneNumber',
        elementType: 'input'
    },
    email: {
        label: 'E-mail',
        placeholder: 'Введите адрес электронной почты',
        fieldName: 'email',
        elementType: 'input'
    }
};
