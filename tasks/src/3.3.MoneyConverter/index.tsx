import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    Допиши конвертер валют.
    - Если пользователь ввел значение в рублях, то количество евро обновляется согласно курсу
    - Если пользователь ввел значение в евро, то количество рублей обновляется согласно курсу
 */

const RUBLES_IN_ONE_EURO = 70;

class MoneyConverter extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="form">
          <h2>Конвертер валют</h2>
          <div>
            <span>&#8381;</span>
            <Money />
            &mdash;
            <Money />
            <span>&euro;</span>
          </div>
        </div>
      </div>
    );
  }
}

type MoneyProps = {};

type MoneyState = {
  value: number;
};

class Money extends React.Component<MoneyProps, MoneyState> {
  constructor(props: MoneyProps) {
    super(props);
    this.state = {
      value: 0
    };
  }

  render() {
    return <input type="text" value={this.state.value} onChange={this.handleChangeValue} />;
  }

  handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = extractNumberString(event.target.value);
    this.setState({ value });
  };
}

function extractNumberString(value: string): number {
  const str = value.replace(/^0+/g, '').replace(/[^.0-9]/g, '');
  const parts = str.split('.');
  return Number(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str);
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<MoneyConverter />);

/**
    Подсказки:
    - Сейчас каждый компонент Money хранит свое значение в собственном состоянии,
      чтобы конвертер работал, нужно уметь обновлять значение извне, поэтому нужно получать его из props.
    - В MoneyConverter наоборот надо создать состояние, которое будет хранить значения в обеих валютах.
      Таким образом ты сделаешь Lift State Up.
    - Заметь, что компонент Money теперь не содержит состояние и его можно переделать в функциональный компонент.
 */
