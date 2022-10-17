import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    Сделай так, чтобы в переменной userName сохранялось введенное пользователем значение.
 */

let userName = 'По умолчанию';

const mydom = (
  <div className="root">
    <div className="form">
      <div style={{ paddingRight: '10px', display: 'inline-block' }}>
        <label htmlFor="name">Имя</label>
      </div>
      <input
        id="name"
        type="text"
        size={39}
        onChange={event => (userName = event.target.value)}
        onBlur={() => alert(`userName: ${userName}`)}
      />
    </div>
  </div>
);

ReactDom.render(mydom, document.getElementById('app'));

/**
    Подсказки:
    - Chrome DevTools содержит прекрасный отладчик. Открывается через Ctrl+Shift+I.
    - Инструкция debugger останавливает отладчик, если открыты DevTools.
    - Посмотри, что приходит первым аргументом в обработчик onChange.
    - onBlur вызывается при потере фокуса.
      Фокус - это куда будет осуществляться ввод с клавиатуры.
      Часто элементы с фокусом подсвечивают.
 */
