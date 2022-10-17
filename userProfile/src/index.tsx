import React from 'react';
import ReactDom from 'react-dom';
import './style.css';
import { Button } from '@skbkontur/react-ui';
import { Task } from './Task';
import { Form } from './Form';

/**
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

const App = () => (
    <div>
        <Task id="1">Hello world</Task>
        <Task id="2">
            Click this button <Button onClick={() => console.log('Hey!')}>Click me</Button>
        </Task>
        <Task id="3">
            <Form />
        </Task>
    </div>
);

ReactDom.render(<App />, document.getElementById('root'));
