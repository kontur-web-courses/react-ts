import React, { useState } from 'react';
import ReactDom from 'react-dom';
import '../styles.css';
import '../toggle.css';

type ToggleProps = {
  onChange(value: boolean): void;
};

const Toggle: React.FC<ToggleProps> = props => {
  const [checked, setChecked] = useState(true);
  const handleClick = () => {
    const nextChecked = !checked;
    setChecked(nextChecked);
    props.onChange(nextChecked);
  };
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
