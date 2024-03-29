import React from 'react';
import { createRoot } from 'react-dom/client';
import Form from './Form';
import './style.css';

/**
 *  Итак, перед тобой пустой проект. Давай его чем-то заполним. Не стесняйся подсматривать в уже сделанные задачи,
 *  чтобы оттуда что-то скопировать.
 *
 *  1. Создай в файле index.html (он на уровень выше в файловой структуре) div с каким-нибудь id
 *  2. Импортируй сюда библиотеку React и ReactDom
 *  3. Отрендери "Hello world" на странице при помощи Реакта.
 *  4. Добавь в разметку Button из библиотеки компонентов Контура (@skbkontur/react-ui). npm-пакет с библиотекой
 *  уже добавлен в проект.
 *  Тут инструкция по использованию библиотеки:
 *  https://github.com/skbkontur/retail-ui/blob/master/packages/retail-ui/README.md
 *  Тут можно посмотреть, как компонентами пользоваться, какие у них атрибуты есть:
 *  http://tech.skbkontur.ru/react-ui/
 *  5. Теперь, когда ты знаешь все основное. Сверстай при помощи react-ui форму, как на картинке
 *  (../../assets/reactForm.png). Для отступов между элементами используй компонент Gapped из библиотеки. Если
 *  хочешь что-то стилизовать, используй файл style.css. Список городов придумай сам.
 *  6. Сделай, чтобы при клике по кнопке "Сохранить", показывалось модальное окно (компонент Modal из библиотеки) с
 *  текстом "Пользователь сохранен" (выглядеть будет примерно как на картинке ../../assets/reactModal.png)
 *  7. Сделай, чтобы в той же модалке (в теле модального окна — Modal.Body) показывались изменения в полях
 *  (../../assets/reactDiff.png):
 *
 *  Измененные данные:
 *  Фамилия: было "Петров", стало "Петрова"
 *
 *  Для этого надо хранить где-то предыдущее (и текущее) значение. Придумай, как лучше это сделать.
 *
 *  8*. Необязательная задача. Сделай, чтобы форма не сохранялась, если поле имя или фамилия незаполнено.
 *  Незаполненное поле должно анимацией покачаться из стороны в сторону (или придумай любой другой эффект).
 *
 *  9*. Необязательная задача. Добавь в эту форму еще поля: пол, дата рождения, город рождения, семейное положение,
 *  гражданство, национальность, номер телефона и адрес электронной почты. Придумай, как избежать излишнего
 *  дублирования.
 */

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Form />);
