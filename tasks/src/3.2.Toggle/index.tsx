import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';
import './toggle.css';

/**
    Допиши компонент Toggle.
    Пусть флаг хранится во внутреннем состоянии,
    а при изменении передается наружу через onChange.
 */

type ToggleProps = {
  onChange(value: boolean): void;
};

const Toggle: React.FC<ToggleProps> = (props) => {
  const checked = true;
  const handleClick = () => {};
  return (
    <span className={'container' + (checked ? ' isChecked' : '')} onClick={handleClick}>
      <span className="handle">
        <div className="bg" />
        <span className="hinge" />
      </span>
    </span>
  );
};

ReactDom.render(
  <div className="page">
    <Toggle onChange={value => console.log(value)} /> Использовать умные компоненты
  </div>,
  document.getElementById('app')
);

/**
    Подсказки:
    - Начальное состояние компонента можно передать в вызов функции useState
    - useState возвращает массив из текущего состояния и функции для его обновления
 */
