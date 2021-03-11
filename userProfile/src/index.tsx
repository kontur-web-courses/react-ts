import './style.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';

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
const cities = ['Екатеринбург', 'Москва', 'Санкт-Петербург', 'Казань'];
type FormState = { currentUser: FormData; previousUser: FormData; isModalOpen: boolean };
type FormData = { [name: string]: string };

class Form extends React.Component<{}, FormState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            previousUser: { name: '', surname: '', city: '' },
            currentUser: { name: '', surname: '', city: '' },
            isModalOpen: false
        };
    }

    renderModal = (): JSX.Element => {
        const userHasChanged = !Object.values(this.state.previousUser).every(field => field === '');
        const modalBody = (
            <Modal.Body>
                <div>Измененные данные:</div>
                <ChangedRow field="name" currentUser={this.state.currentUser} previousUser={this.state.previousUser} />
                <ChangedRow field="surname" currentUser={this.state.currentUser} previousUser={this.state.previousUser} />
                <ChangedRow field="city" currentUser={this.state.currentUser} previousUser={this.state.previousUser} />
            </Modal.Body>
        );
        return (
            <Modal onClose={this.close}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                {userHasChanged && modalBody}
                <Modal.Footer>
                    <Button onClick={this.close}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    open = () => {
        this.setState({ isModalOpen: true });
    };

    close = () => {
        this.setState({ previousUser: { ...this.state.currentUser } });
        this.setState({ isModalOpen: false });
    };

    setValue = (value: string, field: string) => {
        this.setState({ currentUser: { ...this.state.currentUser, [field]: value } });
    };

    render() {
        return (
            <div className="form-container">
                {this.state.isModalOpen && this.renderModal()}
                <h1 className="form-header">Информация о пользователе</h1>
                <form className="form">
                    <Gapped vertical gap={16}>
                        <div className="form-group">
                            <label className="label" htmlFor="name">
                                Имя
                            </label>
                            <Input
                                id="name"
                                placeholder="Введите имя пользователя"
                                onValueChange={(value: string) => this.setValue(value, 'name')}
                            ></Input>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="surname">
                                Фамилия
                            </label>
                            <Input
                                id="surname"
                                placeholder="Введите фамилию пользователя"
                                onValueChange={(value: string) => this.setValue(value, 'surname')}
                            ></Input>
                        </div>
                        <div className="form-group">
                            <label className="label" htmlFor="city">
                                Город
                            </label>
                            <Select<string>
                                items={cities}
                                placeholder="Выберите город"
                                onValueChange={(value: string) => this.setValue(value, 'city')}
                            />
                        </div>
                        <Button onClick={this.open}>Сохранить</Button>
                    </Gapped>
                </form>
            </div>
        );
    }
}
type ChangeRowPropsType = { field: keyof FormData; previousUser: FormData; currentUser: FormData };

class ChangedRow extends React.Component<ChangeRowPropsType, {}> {
    constructor(props: ChangeRowPropsType) {
        super(props);
    }
    render() {
        const fieldHasChanged: boolean =
            this.props.currentUser[this.props.field] !== this.props.previousUser[this.props.field];
        let fieldName = '';
        switch (this.props.field) {
            case 'name':
                fieldName = 'Имя';
                break;
            case 'surname':
                fieldName = 'Фамилия';
                break;
            case 'city':
                fieldName = 'Город';
                break;
        }
        return (
            fieldHasChanged && (
                <div>
                    {fieldName}: было {this.props.previousUser[this.props.field]}, стало {this.props.currentUser[this.props.field]}
                </div>
            )
        );
    }
}

ReactDom.render(<Form />, document.getElementById('app'));
