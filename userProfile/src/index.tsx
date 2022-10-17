import './style.css';
import React, { FC, useState } from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';

const items = [
    'Москва',
    'Екатеринбург',
    'Санкт-Петербург',
    'Новосибирск',
    'Казань',
    'Нижний Новгород',
    'Челябинск',
    'Самара',
    'Омск',
    'Ростов-на-Дону',
    'Уфа'
];

type FormData = {
    name: string;
    surname: string;
    city: string;
};

type DataState = {
    saved: FormData;
    current: FormData;
};

const defaultForm = {
    name: '',
    surname: '',
    city: undefined
};

const Form: React.FC = () => {
    const [data, setData] = useState({
        saved: { ...defaultForm },
        current: { ...defaultForm }
    });
    const [saved, setSaved] = useState(false);
    const [opened, setOpened] = useState(false);
    const [panel, setPanel] = useState(false);
    function changeValue(value: string, field: string) {
        setData({ ...data, current: { ...data.current, [field]: value } });
    }

    function renderModal() {
        const listItems = [];
        if (data.current.name !== data.saved.name)
            listItems.push(
                <p>
                    Имя: было {data.saved.name} стало {data.current.name}
                </p>
            );
        if (data.current.surname !== data.saved.surname)
            listItems.push(
                <p>
                    Фамилия: была {data.saved.surname} стала {data.current.surname}
                </p>
            );
        if (data.saved.city !== data.current.city)
            listItems.push(
                <p>
                    Город: был {data.saved.city} стал {data.current.city}
                </p>
            );
        return (
            <Modal onClose={close}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>{listItems.length !== 0 && saved && <div>Измененные данные: {listItems}</div>}</Modal.Body>
                <Modal.Footer panel={panel}>
                    <Button
                        onClick={() => {
                            close();
                        }}
                    >
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function open() {
        setOpened(true);
    }

    function close() {
        setOpened(false);
        setData({ ...data, saved: data.current });
        setSaved(true);
    }

    return (
        <>
            <form>
                <h1>Информация о пользователе</h1>
                <Gapped gap={14} vertical>
                    <label>
                        <div className="name">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={data.current.name}
                            onValueChange={name => changeValue(name, 'name')}
                        />
                    </label>
                    <label>
                        <div className="surname">Фамилия</div>
                        <Input
                            placeholder="Введите фамилию пользователя"
                            value={data.current.surname}
                            onValueChange={surname => changeValue(surname, 'surname')}
                        />
                    </label>
                    <label>
                        <div className="city">Город</div>
                        <Select
                            placeholder="Выберите город"
                            items={items}
                            value={data.current.city}
                            onValueChange={city => changeValue(city, 'city')}
                            search
                        />
                    </label>
                    <Button
                        use="primary"
                        size="large"
                        onClick={() => {
                            open();
                        }}
                    >
                        Сохранить
                    </Button>
                </Gapped>
            </form>
            {opened && renderModal()}
        </>
    );
};

ReactDom.render(<Form />, document.getElementById('userForm'));
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
 *     import { Button } from '@skbkontur/react-ui';
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
