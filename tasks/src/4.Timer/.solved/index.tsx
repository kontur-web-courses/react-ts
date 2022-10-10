import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

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
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = window.setInterval(() => {
      console.log('tick');
      setLocalTime(new Date());
    }, 1000);

    return () => window.clearInterval(Number(timer.current));
  }, []);

  return <div className="time">{localTime.toLocaleTimeString()}</div>;
};

ReactDom.render(<Timer />, document.getElementById('app'));
