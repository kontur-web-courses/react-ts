import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import '../styles.css';

type InputFormRowProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function InputFormRow(props: InputFormRowProps) {
  const { label, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>();
  const handleClick = () => inputRef.current?.focus?.();
  return (
    <div className="row pointer" onClick={handleClick}>
      <div className="label">{label}</div>
      <input ref={inputRef} {...rest} />
    </div>
  );
}

ReactDom.render(
  <div className="form">
    <form>
      <InputFormRow label="Фамилия" type="text" defaultValue="Иванов" />
      <InputFormRow label="Имя" type="text" defaultValue="Иван" />
      <InputFormRow label="Отчество" type="text" defaultValue="Иванович" />
      <InputFormRow label="Вегетарианец" type="checkbox" defaultChecked />
    </form>
    <div className="saveContainer">
      <input type="submit" className="actionButton" value="Сохранить" />
    </div>
  </div>,
  document.getElementById('app')
);
