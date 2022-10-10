import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

const RUBLES_IN_ONE_EURO = 70;

const MoneyConverter: React.FC = () => {
  const [valueInRubles, setValueInRubles] = useState(0);
  const [valueInEuros, setValueInEuros] = useState(0);

  const handleRublesChange = (newValueInRubles: number) => {
    setValueInRubles(newValueInRubles);
    setValueInEuros(newValueInRubles / RUBLES_IN_ONE_EURO);
  };

  const handleEurosChange = (newValueInEuros: number) => {
    setValueInEuros(newValueInEuros);
    setValueInRubles(newValueInEuros * RUBLES_IN_ONE_EURO);
  };

  return (
    <div className="root">
      <div className="form">
        <h2>Конвертер валют</h2>
        <div>
          <span>&#8381;</span>
          <Money value={valueInRubles} setValue={handleRublesChange} />
          &mdash;
          <Money value={valueInEuros} setValue={handleEurosChange} />
          <span>&euro;</span>
        </div>
      </div>
    </div>
  );
};

type MoneyProps = {
  value: number;
  setValue: (value: number) => void;
};

const Money: React.FC<MoneyProps> = ({ value, setValue }) => {
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = extractNumberString(event.target.value);
    setValue(value);
  };

  return <input type="text" value={value} onChange={handleChangeValue} />;
};

function extractNumberString(value: string): number {
  const str = value.replace(/^0+/g, '').replace(/[^.0-9]/g, '');
  const parts = str.split('.');
  return Number(parts.length > 2 ? parts[0] + '.' + parts.slice(1).join('') : str);
}

ReactDom.render(<MoneyConverter />, document.getElementById('app'));
