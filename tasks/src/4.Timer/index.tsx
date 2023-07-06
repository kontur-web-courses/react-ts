import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/**
    1. Допиши TimeDisplay так, чтобы он показывал текущее время пользователя и сам обновляется каждую секунду.
    2. Пусть при каждом обновлении времени в консоль пишется сообщение:
          console.log('tick');
    3. Позаботься об освобождении ресурсов в случае удаления элемента.
       Убедись, что если компонент скрыть кнопкой, то в консоль не будут писаться тики.
 */

type TimerState = {
  timeVisible: boolean;
};

class Timer extends React.Component<{}, TimerState> {
  constructor(props: {}) {
    super(props);
    this.state = { timeVisible: true };
  }

  render() {
    const { timeVisible } = this.state;
    return (
      <div className="page">
        <input
          className="button"
          type="button"
          value={timeVisible ? 'Скрыть' : 'Показать'}
          onClick={() => {
            this.setState({ timeVisible: !timeVisible });
          }}
        />
        {this.state.timeVisible && <TimeDisplay />}
      </div>
    );
  }
}

type TimeDisplayState = {
  localTime: Date;
};

class TimeDisplay extends React.Component<{}, TimeDisplayState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      localTime: new Date()
    };
  }

  render() {
    return <div className="time">{this.state.localTime.toLocaleTimeString()}</div>;
  }
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Timer />);

/**
    Подсказки:
    - Функция window.setInterval регистрирует обработчик handler,
      который будет вызываться не чаще, чем в заданное количество миллисекунд.
      Оформляется так:
          const intervalId = window.setInterval(handler, intervalInMilliseconds);
    - intervalId можно передать в функцию clearInterval, чтобы остановить вызов обработчика:
          window.clearInterval(intervalId);
    - this.setState({property: value}) обновляет часть состояния и инициирует перерисовку.
    - componentDidMount вызывается сразу после того, как компонент размещен на странице.
      В нем можно делать запросы на получение данных или подписываться на события.
    - componentWillUnmount вызывается перед тем как удалить компонент.
      Гарантированно вызовется, если элемент «did mount». Отличное место, чтобы освобождать ресурсы.
 */
