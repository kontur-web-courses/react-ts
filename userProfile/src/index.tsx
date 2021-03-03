import './style.css';
import React, { useState } from 'react';
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

type UserInfoData = {
    name: string;
    surname: string;
    city: string | undefined;
};

const keyUserInfoMap = {
    name: 'Имя',
    surname: 'Фамилия',
    city: 'Город'
};

const defaultUserInfo = {
    name: '',
    surname: '',
    city: undefined
};

const Form = () => {
    const cities: string[] = ['Москва', 'Санкт-Питербург', 'Екатеринбург', 'Казань'];
    const [userInfo, setUserInfo] = useState<UserInfoData>(defaultUserInfo);
    const [saveUserInfo, setSaveUserInfo] = useState<UserInfoData>(defaultUserInfo);
    const [modalOpened, setModalOpened] = useState(false);

    const changeData = (field: keyof UserInfoData): ((value: string) => void) => {
        return (value: string) => {
            setUserInfo(userInfo => ({ ...userInfo, [field]: value }));
        };
    };

    const openModal = (): void => {
        setModalOpened(true);
    };

    const closeModal = (): void => {
        setSaveUserInfo({ ...userInfo });
        setModalOpened(false);
    };

    const changedUserInfo = (): Array<JSX.Element> => {
        const diffUserInfo: Array<JSX.Element> = [];

        Object.keys(userInfo).forEach(userInfoKey => {
            const key = userInfoKey as keyof UserInfoData;
            if (userInfo[key] !== saveUserInfo[key]) {
                diffUserInfo.push(
                    <p key={key}>
                        {keyUserInfoMap[key]}: было {saveUserInfo[key] || 'Пусто'}, стало {userInfo[key] || 'Пусто'}
                    </p>
                );
            }
        });

        return diffUserInfo;
    };

    const renderModal = () => {
        const diffUserInfo = changedUserInfo();
        return (
            <Modal onClose={closeModal}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                {diffUserInfo.length > 0 && (
                    <Modal.Body>
                        <p>Измененные данные:</p>
                        {diffUserInfo.map(diff => diff)}
                    </Modal.Body>
                )}
                <Modal.Footer>
                    <Button onClick={closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    };

    return (
        <form className="form">
            {modalOpened && renderModal()}
            <Gapped gap={15} vertical>
                <h1>Информация о пользователе</h1>
                <label>
                    <span className="label">Имя</span>
                    <Input placeholder="Введите имя пользователя" onValueChange={changeData('name')} />
                </label>
                <label>
                    <span className="label">Фамилия</span>
                    <Input placeholder="Введите фамилию пользователя" onValueChange={changeData('surname')} />
                </label>
                <label>
                    <span className="label">Город</span>
                    <Select<string> placeholder="Выберите город" items={cities} onValueChange={changeData('city')} />
                </label>
                <Button use="primary" size="large" onClick={openModal}>
                    Сохранить
                </Button>
            </Gapped>
        </form>
    );
};

ReactDom.render(<Form />, document.getElementById('app'));
