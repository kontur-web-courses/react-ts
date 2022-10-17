import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    Напиши обработчик нажатия на кнопку.
    При нажатии должно выводиться диалоговое окно с сообщением «Отправлено».
 */

ReactDom.render(
  <div className="root">
    <div className="form">
      <div style={{ marginBottom: '10px' }}>Нажми отправить</div>
      <input type="button" className="button" value="Отправить" onClick={() => alert('Отправлено')} />
    </div>
  </div>,
  document.getElementById('app')
);

/**
    Подсказки:
    - alert(msg) — создает простое диалоговое окно с сообщением msg
    - Компоненты React, соответствующие HTML, поддерживают атрибуты onClick, onChange и т.д.
      В них можно передать функцию-обработчик события.
    - Стрелочные функции: (x, y) => { return x + y; } — «непроизводительный»,
      но быстрый способ написать обработчик событий
 */
