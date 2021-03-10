import './style.css';
import React, { ChangeEvent, FormEvent } from 'react';
import ReactDom from 'react-dom';
import { Button, Center, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';

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
 *        <div>
 *            Click this button <Button onClick={() => console.log('Hey!')}>Click me</Button>
 *        </div>
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

const items = [
    Select.static(() => <Select.Item>Not selectable</Select.Item>),
    'Екатеринбург',
    'Москва',
    'Питер',
    'Новосиб'
];

type Fields = 'city' | 'userName' | 'userSurname';

type FormValues = {
    [key in Fields]: string;
};

interface UserFormState {
    values: FormValues;
    openedModal: Boolean;
}

type ModifiedDataType = { oldData: string; newData: string; index: string }[];

class Form extends React.Component<{}, UserFormState> {
    private oldDataForm: FormValues = { city: '', userName: '', userSurname: '' };
    private modifiedData: ModifiedDataType = [];

    constructor(props: {}) {
        super(props);

        const values: FormValues = {
            userName: '',
            userSurname: '',
            city: ''
        };

        this.state = {
            values,
            openedModal: false
        };
    }

    changeSelect = (value: any) => {
        const values = this.state.values;
        values['city'] = value;

        this.setState({ values });
    };

    changeData = (target: HTMLFormElement) => {
        const values = this.state.values;

        const formData = new FormData(target);

        values.userName = formData.get('userName') as string;
        values.userSurname = formData.get('userSurname') as string;

        this.setState({ values });
    };

    submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.changeData(event.target as HTMLFormElement);

        this.modifiedData = this.getChangesDate(this.oldDataForm, this.state.values);
        this.updateOldData(this.state.values);

        this.setState({ openedModal: true });
    };

    closeModal = () => {
        this.setState({ openedModal: false });
    };

    getChangesDate(oldData: FormValues, newData: FormValues) {
        const changes: ModifiedDataType = [];

        for (const key of Object.keys(newData)) {
            const keyOfField = key as Fields;

            if (newData[keyOfField] !== oldData[keyOfField]) {
                changes.push({
                    oldData: oldData[keyOfField],
                    newData: newData[keyOfField],
                    index: key
                });
            }
        }

        return changes;
    }

    updateOldData(newData: FormValues) {
        for (const key of Object.keys(newData)) {
            const keyOfField = key as Fields;

            this.oldDataForm[keyOfField] = newData[keyOfField];
        }
    }

    render() {
        return (
            <div>
                <form className="form" onSubmit={this.submit}>
                    <Gapped vertical gap={16}>
                        <h2 className="form__title">Информация о пользователе</h2>
                        <div className="form__item">
                            <label className="form__item-label" htmlFor="user-name">
                                Имя
                            </label>
                            <Input className="form__item-input" name="userName" id="user-name" />
                        </div>
                        <div className="form__item">
                            <label className="form__item-label" htmlFor="user-surname">
                                Фамилия
                            </label>
                            <Input className="form__item-input" id="user-surname" name="userSurname" />
                        </div>
                        <div className="form__item">
                            <label className="form__item-label" htmlFor="user-surname">
                                Город
                            </label>
                            <Select
                                placeholder="Выберите город"
                                items={items}
                                value={this.state.values.city}
                                onValueChange={this.changeSelect}
                            />
                        </div>
                        <Button use="primary" type="submit">
                            Отправить
                        </Button>
                    </Gapped>
                </form>
                {this.state.openedModal && <ModalForm close={this.closeModal} modifiedData={this.modifiedData} />}
            </div>
        );
    }
}

interface ModalProps {
    close: () => void;
    modifiedData: ModifiedDataType;
}

class ModalForm extends React.Component<ModalProps, {}> {
    constructor(props: ModalProps) {
        super(props);
    }

    formatModifiedData(modifiedData: ModifiedDataType) {
        if (modifiedData.length === 0) return null;

        const formatedData: React.ReactElement[] = [];

        for (const itemData of modifiedData) {
            formatedData.push(
                <p key={itemData.index}>{`Было: ${itemData.oldData || ''}, Стало: ${itemData.newData || ''}`}</p>
            );
        }

        return formatedData;
    }

    render() {
        return (
            <Modal onClose={this.props.close}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>
                    <p>{this.props.modifiedData.length > 0 ? 'Измененные данные:' : 'Данные не изменились'}</p>
                    {this.formatModifiedData(this.props.modifiedData)}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.close}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <Center>
                <Form />
            </Center>
        );
    }
}

ReactDom.render(<App />, document.getElementById('root'));
