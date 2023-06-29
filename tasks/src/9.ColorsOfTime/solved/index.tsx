import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';
import * as helpers from '../helpers';
import * as themes from '../themes';
import TimeDisplay from '../TimeDisplay';
import Timer from '../Timer';
import Button from '../Button';
import { Theme } from '../themes';

const CurrentTimeContext = React.createContext<Date | null>(null);
const ThemeContext = themes.Context;

type ChangeThemeType = 'prev' | 'next';
type ChangeThemeHandler = (changeThemeType: ChangeThemeType) => void;

const ChangeThemeContext = React.createContext<ChangeThemeHandler>(() => {});

const ThemedButton = themes.withTheme(Button);

type ColorsOfTimeProps = { timer: Timer };

const ColorsOfTime = (props: ColorsOfTimeProps) => {
  const [currentTime, changeCurrentTime] = React.useState<Date | null>(null);
  const [theme, changeTheme] = React.useState<Theme>(themes.red);

  React.useEffect(() => {
    const handleTimerUpdated = (currentTime: Date | null) => {
      changeCurrentTime(currentTime);
    };
    props.timer.addUpdated(handleTimerUpdated);
    return () => {
      props.timer.removeUpdated(handleTimerUpdated);
    };
  }, []);

  const dispatchChangeTheme = React.useCallback((type: ChangeThemeType) => {
    let newTheme = null;
    switch (type) {
      case 'prev':
        newTheme = themes.getPrevTheme(theme);
        break;
      case 'next':
        newTheme = themes.getNextTheme(theme);
        break;
    }
    changeTheme(newTheme);
  }, []);

  return (
    <ChangeThemeContext.Provider value={dispatchChangeTheme}>
      <ThemeContext.Provider value={theme}>
        <CurrentTimeContext.Provider value={currentTime}>
          <div className="page">
            <h1>Цвета времени</h1>
            <Top />
            <Middle />
            <Bottom />
          </div>
        </CurrentTimeContext.Provider>
      </ThemeContext.Provider>
    </ChangeThemeContext.Provider>
  );
};

const Top = React.memo(() => {
  registerRenderForDebug('Top');
  return (
    <div className="block">
      <Card title="Серый Лондон" timezone={+0} />
      <Card title="Синий Нью-Йорк" timezone={-4} color="blue" />
      <Card title="Зеленый Париж" timezone={+2} color="green" />
      <Card title="Красный Пекин" timezone={+8} color="red" />
    </div>
  );
});

const Middle = React.memo(() => {
  const theme = React.useContext(ThemeContext);
  return (
    <div className="block">
      <Card title="Цветное локальное" color={theme.foregroundColor} />
    </div>
  );
});

const Bottom = React.memo(() => {
  const dispatchChangeTheme = React.useContext(ChangeThemeContext);
  return (
    <div className="block">
      <ThemedButton value="← цвет" onClick={() => dispatchChangeTheme('prev')} />
      <ThemedButton value="цвет →" onClick={() => dispatchChangeTheme('next')} />
    </div>
  );
});

type CardProps = { title: string; color?: string; timezone?: number };

const Card = React.memo(({ color, title, timezone }: CardProps) => {
  registerRenderForDebug('Card');
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        <CurrentTimeContext.Consumer>
          {currentTime => (
            <TimeDisplay time={timezone ? helpers.toTimezone(currentTime, timezone) : currentTime} color={color} />
          )}
        </CurrentTimeContext.Consumer>
      </div>
    </div>
  );
});

function registerRenderForDebug(name: string) {
  console.log(`render ${name} at ${new Date().toLocaleTimeString()}`);
}

const timer = new Timer();

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<ColorsOfTime timer={timer} />);

/**
 Подсказки:
 - Создание контекста:
 const CakeContext = React.createContext();
 - Поставка значения:
 <CakeContext.Provider value={cheeseCake}>
 ...
 </CakeContext.Provider>
 - Потребление значения:
 <CakeContext.Consumer>
 {cake => <Hungry food={cake} />}
 </CakeContext.Consumer>
 - const cake = React.useContext(CakeContext);
 */
