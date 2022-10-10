import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    InputFormRow позволяет клепать формы еще быстрее, чем раньше!
    Количество дублирования кода уменьшается, а еще благодаря ему
    можно добавить новые фишки во все поля формы сразу.

    Сделай так, чтобы при клике по любому месту InputFormRow фокус переводился в поле ввода.

    Обрати внимание:
    - Как все props, кроме нужных, элегантно пробрасываются в input.
 */

type InputFormRowProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

function InputFormRow(props: InputFormRowProps) {
  const { label, ...rest } = props;
  const handleClick = () => {};
  return (
    <div className="row" onClick={handleClick}>
      <div className="label">{label}</div>
      <input {...rest} />
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

/**
    Подсказки:
    - У элемента input есть метод focus(), но нужна ссылка.
    - Есть два способа получить ссылку:
      - <div ref={myRef}/>, но надо заранее создать myRef = useRef();
        У ссылки получится такой тип: React.MutableRefObject<HTMLInputElement>
      - <div ref={r => myRef = r} и тогда при вызове render в свойстве myRef окажется ссылка.
        Тип такого ref для input: HTMLInputElement | null
      В зависимости от выбранного способа в myRef будут немного разные объекты.
    - Чтобы пользователь догадался, что он может кликнуть по ряду
      и что-то произойдет, добавь в div с css-классом row класс pointer.
 */
