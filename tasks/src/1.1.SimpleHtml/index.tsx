import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    1. Отрендери эту форму из from.html с использованием React.

    Помни про:
    - Обязательное закрытие одиночных тэгов:
        - <br> → <br/>
        - <input> → <input/>
    - Переименование некоторых атрибутов:
        - class → className
        - for → htmlFor
        - checked → defaultChecked
        - value → defaultValue
    - {} и "" для передачи значений
    - Оформление style в виде объекта: <div style={{paddingTop: 10, paddingBottom: "20px"}}>
    - Общее правило именование атрибутов и свойств — camelCase

    2. Убедись, что новая форма выглядит также как старая, поля редактируются,
       флажок переключается при нажатии на слово «Согласие»
 */
const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<form></form>);
