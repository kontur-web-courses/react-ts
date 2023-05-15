import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

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
  private localTickInterval: number | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      localTime: new Date()
    };
  }

  componentDidMount() {
    this.localTickInterval = window.setInterval(() => {
      console.log('tick');
      this.setState({
        localTime: new Date()
      });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.localTickInterval) {
      window.clearInterval(this.localTickInterval);
      this.localTickInterval = null;
    }
  }

  render() {
    return <div className="time">{this.state.localTime.toLocaleTimeString()}</div>;
  }
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Timer />);
