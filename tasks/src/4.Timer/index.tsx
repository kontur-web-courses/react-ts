import React, { useState } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
 1. Допиши TimeDisplay так, чтобы он показывал текущее время пользователя и сам обновляется каждую секунду.
 2. Пусть при каждом обновлении времени в консоль пишется сообщение:
 console.log('tick');
 3. Позаботься об освобождении ресурсов в случае удаления элемента.
 Убедись, что если компонент скрыть кнопкой, то в консоль не будут писаться тики.
 */

const Timer: React.FC = () => {
  const [timeVisible, setTimeVisible] = useState(false);

  return (
    <div className="page">
      <input
        className="button"
        type="button"
        value={timeVisible ? 'Скрыть' : 'Показать'}
        onClick={() => {
          setTimeVisible(!timeVisible);
        }}
      />
      {timeVisible && <TimeDisplay />}
    </div>
  );
};

const TimeDisplay: React.FC = () => {
  const [localTime, setLocalTime] = useState(new Date());

  return <div className="time">{localTime.toLocaleTimeString()}</div>;
};

ReactDom.render(<Timer />, document.getElementById('app'));

/**
 Подсказки:
 - Функция window.setInterval регистрирует обработчик handler,
 который будет вызываться не чаще, чем в заданное количество миллисекунд.
 Оформляется так:
 const intervalId = window.setInterval(handler, intervalInMilliseconds);
 - intervalId можно передать в функцию clearInterval, чтобы остановить вызов обработчика:
 window.clearInterval(intervalId);
 - вызов функции set***, которую возвращает хук useState, обновляет часть состояния и инициирует перерисовку.
 - функция, переданная первым аргументом в useEffect, подписывается на изменения во втором параметре:
 - Если передан `[value]`, то срабатывает при первом рендере компонента и при изменении `value`
 - Если передан `[]`, то срабатывает один раз, при маунте компонента
 - Если передан `undefined`, то срабатывает после каждого рендера
 - если из функции, которая передаётся в useEffect, вернуть другую функцию,
 она вызовется перед тем как удалить компонент. Отличное место, чтобы освобождать ресурсы.
 */
