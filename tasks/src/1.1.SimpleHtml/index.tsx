import React from 'react';
import ReactDom from 'react-dom';
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

ReactDom.render(
  <form className="form">
    <h1>Добавление отзыва</h1>
    <div>
      <div className="row">
        <div className="caption">
          <label htmlFor="name">Имя</label>
        </div>
        <input id="name" type="text" size={39} />
      </div>
      <div className="row">
        <div className="caption">
          <label htmlFor="mail">Почта</label>
        </div>
        <input id="mail" type="email" size={39} />
      </div>
      <div className="row">
        <div className="caption">
          <label htmlFor="city">Город</label>
        </div>
        <input id="city" type="city" size={39} defaultValue="Екатеринбург" />
      </div>
      <div className="row">
        <div className="caption">
          <label htmlFor="comment">Отзыв</label>
        </div>
        <textarea id="comment" maxLength={40} />
      </div>
      <div className="row">
        <div className="caption">
          <label htmlFor="agreement">Согласие</label>
        </div>
        <input id="agreement" type="checkbox" defaultChecked />
      </div>
      <br />
      <div className="row" style={{ marginTop: '10px', width: '400px', textAlign: 'center' }}>
        <input type="button" className="button" defaultValue="Отправить" />
      </div>
    </div>
  </form>,
  document.getElementById('app')
);
