import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    Напиши обработчик нажатия на кнопку.
    При нажатии должно выводиться диалоговое окно с сообщением «Отправлено».
 */

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="root">
    <div className="form">
      <div style={{ marginBottom: '10px' }}>Нажми отправить</div>
      <input type="button" className="button" value="Отправить" />
    </div>
  </div>
);

/**
    Подсказки:
    - alert(msg) — создает простое диалоговое окно с сообщением msg
    - Компоненты React, соответствующие HTML, поддерживают атрибуты onClick, onChange и т.д.
      В них можно передать функцию-обработчик события.
    - Стрелочные функции: (x, y) => { return x + y; } — «непроизводительный»,
      но быстрый способ написать обработчик событий
 */
