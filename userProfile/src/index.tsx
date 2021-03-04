import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
import { Button, Gapped, Select, Input, Modal } from '@skbkontur/react-ui';

type TUserInfo = {
    name: string;
    surname: string;
    city: string;
};

type TFormState = {
    isModal: boolean;
    user: TUserInfo;
    currentUser: TUserInfo;
};

type TInputParams = {
    id: string;
    label: string;
    placeholder: string;
};

type TSelectParams = {
    id: string;
    label: string;
    placeholder: string;
    items: string[];
};
const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург', 'Нижний Новгород', 'Чита', 'Новосибирск', 'Рязань'];

const defaultUser: TUserInfo = {
    name: '',
    surname: '',
    city: ''
};

const inputFields: TInputParams[] = [
    {
        id: 'name',
        label: 'Имя',
        placeholder: 'Введите имя пользователя'
    },
    {
        id: 'surname',
        label: 'Фамилия',
        placeholder: 'Введите фамилию пользователя'
    }
];

const selectFields: TSelectParams[] = [
    {
        id: 'city',
        label: 'Город',
        placeholder: 'Выберите город',
        items: cities
    }
];

const fieldsNames = {
    name: 'Имя',
    surname: 'Фамилия',
    city: 'Город'
};

class Form extends React.Component {
    public state: TFormState = {
        isModal: false,
        user: { ...defaultUser },
        currentUser: { ...defaultUser }
    };

    onChange = (name: string) => {
        return (value: string) => {
            this.setState({
                currentUser: {
                    ...this.state.currentUser,
                    [name]: value
                }
            });
        };
    };

    renderModal() {
        return (
            <Modal onClose={this.closeModal} width={400}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>
                    <p>Измененные данные:</p>
                    {this.getChanges() || 'Изменений нет'}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    openModal = () => {
        this.setState({ isModal: true });
    };

    closeModal = () => {
        this.setState({
            isModal: false,
            user: this.state.currentUser
        });
    };

    getDifferentFields() {
        const { currentUser, user } = this.state;
        let differentFields: (keyof TUserInfo)[] = [];
        let field: keyof TUserInfo;

        for (field in currentUser) {
            if (currentUser[field] !== user[field]) {
                differentFields.push(field);
            }
        }
        return differentFields;
    }

    getChanges() {
        const differentFields = this.getDifferentFields();

        return differentFields.map(item => {
            return (
                <p key={item}>
                    {fieldsNames[item]}: было {this.state.user[item] || 'пусто'}, стало{' '}
                    {this.state.currentUser[item] || 'пусто'}
                </p>
            );
        });
    }

    renderInputFields() {
        let allInputFields = [];

        for (let field of inputFields) {
            let id = field.id;
            allInputFields.push(
                <label key={id}>
                    <div className="label">{field.label}</div>
                    <Input onValueChange={this.onChange(id)} placeholder={field.placeholder} size="medium" />
                </label>
            );
        }
        return allInputFields;
    }

    renderSelectFields() {
        let allSelectFields = [];

        for (let field of selectFields) {
            allSelectFields.push(
                <label key={field.id}>
                    <div className="label">{field.label}</div>
                    <Select<string>
                        items={field.items}
                        onValueChange={this.onChange(field.id)}
                        placeholder={field.placeholder}
                        size="medium"
                    />
                </label>
            );
        }
        return allSelectFields;
    }

    renderForm() {
        return (
            <form>
                <Gapped vertical gap={20}>
                    {this.renderInputFields()}
                    {this.renderSelectFields()}
                    <Button use="primary" onClick={this.openModal} size="medium">
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    }

    render() {
        const isModal = this.state.isModal;
        return (
            <div>
                <h2>Информация о пользователе</h2>
                {this.renderForm()}
                {isModal && this.renderModal()}
            </div>
        );
    }
}

ReactDom.render(<Form />, document.getElementById('app'));

/**
 *  Итак, перед тобой пустой проект. Давай его чем-то заполним. Не стесняйся подсматривать в уже сделанные задачи,
 *  чтобы оттуда что-то скопировать.
 *
 *  1. Создай в файле index.html (он на уровень выше в файловой структуре) div с каким-нибудь id
 *  2. Импортируй сюда библиотеку React и ReactDom
 *  3. Отрендери "Hello world" на странице при помощи Реакта.
 *
 *  4. Добавь в разметку Button из библиотеки компонентов Контура (@skbkontur/react-ui).
 *     npm-пакет с библиотекой уже добавлен в проект.
 *
 *     Импортируется компонент на страницу так:
 *
 *     import Button from '@skbkontur/react-ui/Button';
 *
 *     Используется компонент так:
 *
 *     const MyApp = () => (
 *
 <div>
 * Click this button <Button onClick={() => console.log('Hey!')}>Click me</Button>
 * </div>
 *     );
 *
 *
 *     Тут можно посмотреть, как компонентами пользоваться, какие у них атрибуты есть:
 *         http://tech.skbkontur.ru/react-ui/
 *
 *  5. Теперь, когда ты знаешь все основное, сверстай при помощи react-ui форму,
 *     как на картинке drafts/reactForm.png (можно открыть в браузере http://localhost:8080/drafts/reactForm.png)
 *     Для вертикальных отступов между элементами используй компонент Gapped из библиотеки.
 *     Если хочешь что-то стилизовать, используй файл style.css.
 *     Список городов придумай сам.
 *
 *  6. Сделай так, чтобы при клике по кнопке "Сохранить",
 *     показывалось модальное окно (компонент Modal из библиотеки) с текстом "Пользователь сохранен".
 *     выглядеть будет примерно как на картинке drafts/reactModal.png (http://localhost:8080/drafts/reactModal.png)
 *
 *  7. Сделай так, чтобы в той же модалке (в теле модального окна — Modal.Body) показывались изменения в полях.
 *     Смотри drafts/reactDiff.png (http://localhost:8080/drafts/reactDiff.png).
 *     Пример сообщения:
 *
 *       Измененные данные:
 *       Фамилия: было "Петров", стало "Петрова"
 *
 *     Для этого надо хранить где-то предыдущее (и текущее) значение. Придумай, как лучше это сделать.
 *
 *  8*. Необязательная задача.
 *      Сделай так, чтобы форма не сохранялась, если поле имя или фамилия не заполнено.
 *      Незаполненное поле должно анимацией покачаться из стороны в сторону (или придумай любой другой эффект).
 *
 *  9*. Необязательная задача.
 *      Добавь в эту форму еще поля: пол, дата рождения, город рождения, семейное положение,
 *      гражданство, национальность, номер телефона и адрес электронной почты.
 *      Придумай, как избежать излишнего дублирования.
 */
