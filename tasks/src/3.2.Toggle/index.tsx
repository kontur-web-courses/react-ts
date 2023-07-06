import React from 'react';
import { createRoot } from 'react-dom/client';
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

type ToggleState = {};

class Toggle extends React.Component<ToggleProps, ToggleState> {
  // constructor(props: ToggleProps) {
  // }

  render() {
    const checked = true;
    return (
      <span className={'container' + (checked ? ' isChecked' : '')} onClick={this.handleClick}>
        <span className="handle">
          <div className="bg" />
          <span className="hinge" />
        </span>
      </span>
    );
  }

  handleClick = () => {};
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <Toggle onChange={value => console.log(value)} /> Использовать умные компоненты
  </div>
);

/**
    Подсказки:
    - Начальное состояние компонента хранится в this.state и обычно инициируется в конструкторе.
    - Не забудь добавить super(props) первой строчкой конструктора, чтобы вызвать конструктор базового типа.
    - this.setState({property: value}) обновляет часть состояния и инициирует перерисовку.
 */
