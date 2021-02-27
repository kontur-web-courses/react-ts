import './style.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';
import './style.css';

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
const prevUser: { name?: string; surname?: string; city?: string } = {};

class Form extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            surname: '',
            city: 'Екатеринбург',
            opened: false
        };
        this.renderModal = this.renderModal.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    renderModal() {
        let modalHeader = '';
        let str = '';
        let name = '';
        let surname = '';
        let city = '';
        let modalBody;
        if (Object.keys(prevUser).length === 0) {
            modalHeader = 'Пользователь сохранен';
        } else {
            str = 'Измененные данные: ';
            modalHeader = 'Пользователь изменен';
            if (prevUser.name !== this.state.name) {
                name += `Имя: было: ${prevUser.name}, стало: ${this.state.name}`;
            }
            if (prevUser.surname !== this.state.surname) {
                surname += `Фамилия: было: ${prevUser.surname}, стало: ${this.state.surname}`;
            }
            if (prevUser.city !== this.state.city) {
                city += `Город: было: ${prevUser.city}, стало: ${this.state.city}`;
            }
            modalBody = <Modal.Body>
                <p>{str}</p>
                <p>{name}</p>
                <p>{surname}</p>
                <p>{city}</p>
            </Modal.Body>
        }
        prevUser.name = this.state.name;
        prevUser.surname = this.state.surname;
        prevUser.city = this.state.city;
        return (
            <Modal onClose={this.close}>
                <Modal.Header>{modalHeader}</Modal.Header>
                {modalBody}
                <Modal.Footer>
                    <Button onClick={this.close}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    open() {
        this.setState({ opened: true });
    }

    close() {
        this.setState({ opened: false });
    }

    render() {
        const items = ['Екатеринбург', 'Москва', 'Санкт-Петербург', 'Казань'];
        return (
            <div className="Form-container">
                {this.state.opened && this.renderModal()}
                <h1 className="Form-header">Информация о пользователе</h1>
                <form className="Form">
                    <Gapped vertical gap={20}>
                        <div className="Form-group">
                            <label className="label" htmlFor="name">
                                Имя
                            </label>
                            <Input
                                id="name"
                                placeholder="Введите имя пользователя"
                                onValueChange={value => this.setState({name: value})}
                            />
                        </div>
                        <div className="Form-group">
                            <label className="label" htmlFor="surname">
                                Фамилия
                            </label>
                            <Input
                                id="surname"
                                placeholder="Введите фамилию пользователя"
                                onValueChange={value => this.setState({surname: value})}
                            />
                        </div>
                        <div className="Form-group">
                            <label className="label" htmlFor="city">
                                Город
                            </label>
                            <Select
                                placeholder="Выберите город"
                                items={items}
                                value={this.state.city}
                                onValueChange={value => this.setState({ city: value })}
                            />
                        </div>
                        <Button onClick={this.open}>Сохранить</Button>
                    </Gapped>
                </form>
            </div>
        );
    }
}

ReactDom.render(<Form />, document.getElementById('app'));
