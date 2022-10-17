import { Button, Gapped, Input, Modal, Select } from '@skbkontur/react-ui';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
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

// Выполнены задания 1-8

const fieldRepo : {[key: string] : string}= {
    'Имя': '',
    'Фамилия': '',
    'Город': '',
}

 const Form = () => {
    let [isOpened, setOpenedState] = useState(false);
    
    let [name, setName] = useState('');
    let [surname, setSurname] = useState('');
    let [city, setCity] = useState('');

    let [nameEmpty, setNameEmpty] = useState(false);
    let [surnameEmpty, setSurnameEmpty] = useState(false);

    const openModal = () => {setOpenedState(true)};
    const closeModal = () => {setOpenedState(false)};

    let [changeMessage, setChangeMessage] = useState(Array<string>());
    const saveChanges = () => {
        if (!name)
            setNameEmpty(true);
        if (!surname)
            setSurnameEmpty(true);
        
        if (!(name && surname))
            return;

        const newChangeMessage = [
            add_if_updated('Имя', name),
            add_if_updated('Фамилия', surname),
            add_if_updated('Город', city), 
        ];

        setChangeMessage(newChangeMessage);
        openModal();
    };

    const add_if_updated = (field_name: string, new_value: string) => {
        const old_value = fieldRepo[field_name];
        fieldRepo[field_name] = new_value;
        if (old_value && old_value !== new_value){
            return `${field_name}: Было ${old_value}, стало ${new_value}`;
        }
        return ''
    };

    return (
        <div className='form'>
            <Gapped vertical gap={20}>
                <p className="form-title">Информация о пользователе</p>
                <InputRow 
                title='Имя' 
                placeholder='Введите имя пользователя'
                onInputChange={value => { setName(value); setNameEmpty(false); }}
                isError={nameEmpty}
                />

                <InputRow 
                title='Фамилия' 
                placeholder='Введите фамилию пользователя'
                onInputChange={value => { setSurname(value); setSurnameEmpty(false); }}
                isError={surnameEmpty}
                />

                <SelectRow 
                title='Город'
                onInputChange={value => {setCity(value) }}
                />
                <Button use="primary" onClick={saveChanges}>Сохранить</Button>
            </Gapped>
        {isOpened && <ModalOnSave close={closeModal} changeMessage={changeMessage}/>}
        </div>
    );
 } 

const ModalOnSave = ({close, changeMessage} : ModeOnSaveType) => (
    <Modal onClose={close}>
        <Modal.Header>Пользователь сохранен</Modal.Header>
        <Modal.Body>
            { changeMessage.map(data => <p>{data}</p>) }
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={close}>Закрыть</Button>
        </Modal.Footer>
    </Modal>
)

const InputRow = ({title, placeholder='', onInputChange, isError} : RowType) => {
      return (
        <div className='inputRow'>
            <Gapped gap={20}>
                <p className='title'>{title}</p>
                <div>
                    <Input placeholder={placeholder} onChange={(e) => onInputChange(e.target.value)}></Input>
                    {isError && <p className='error-message'>Заполните поле</p>}
                </div>
            </Gapped>
            
        </div>
    )
} 

const SelectRow = ({title, onInputChange} : SelectType) => { 
    const cities = ['Москва', 'Санкт-Петербург', 'Екатеринбург'];
    return (
    <div className='inputRow'>
        <Gapped gap={20}>
            <p className='title'>{title}</p>
            {/* Почему-то здесь ругается IDE, хотя по документации должно быть всё ок. Код запускается и работает*/}
            <Select items={cities} placeholder='Выберете город' onValueChange={(value: string) => { onInputChange(value)}}></Select>
        </Gapped>
    </div>
    )
}

type InputType = {
    title: string,
    onInputChange: (value: string) => void,
}

interface RowType extends InputType {
    placeholder?: string,
    isError: boolean,
};

interface SelectType extends InputType {
    title: string,
};

type ModeOnSaveType = {
    close: () => void,
    changeMessage: string[],
};


ReactDom.render(
    <Form></Form>,
    document.getElementById('someId')
);


