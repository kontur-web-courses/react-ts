import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import * as helpers from './helpers';
import * as themes from './themes';
import Button from './Button';
import TimeDisplay from './TimeDisplay';
import Timer from './Timer';
import { Theme } from './themes';

/**
    Автор кода явно сделал много лишней работы,
    прокидывая информацию о времени и настройках цвета через все компоненты.
    А все потому, что не знал про context!

    Для начала разведка ситуации:
    1. Открой Developer Tools и убедись, что render в Card вызывается по 5 раз каждую секунду.
    2. Убедись, что render в Card вызывается при использовании кнопок смены цвета.
    3. Почему render в Top вызывается каждую секунду, если Top — это PureComponent у которого в props нет currentTime?
    4. Подумай, что нужно сделать, чтобы перенести карточку Нью-Йорка в блок Top, а кнопки смены цвета в блок Bottom.

    Отрефактори код по шагам:
    1. Создай CurrentTimeContext.
    2. В компоненте ColorsOfTime в методе render оберни <div className="page">...</div> в CurrentTimeContext.Provider,
       чтобы предоставить максимально большой доступ к value провайдера. В качестве value в тэге Provider задай currentTime.
    3. Используй CurrentTimeContext.Consumer, чтобы не прокидывать currentTime через свойства.
       Тут стратегия минимизации: надо оборачивать в Consumer только те компоненты, которым ресурс требуется.
       Потому что при обновлении значения контекста будет перерисовываться все, что внутри Consumer'ов.
    4. Не забудь убрать ненужное теперь протаскивание currentTime через параметры!
    5. Открой Developer Tools и посмотри, как часто вызывается render в Card с течением времени.
       Попробуй объяснить, почему использование context привело к такому эффекту.
    6. Проделай то же самое для ThemeContext:
       - Создай ThemeContext
       - Оберни CurrentTimeContext.Provider в ThemeContext.Provider
       - Используй ThemeContext.Consumer или React.useContext для передачи темы в кнопки и в Card с цветным локальным временем
       - Снова приберись в коде!
    7. Добавь ChangeThemeContext. Пусть он хранит ссылку на функцию dispatchChangeTheme.
       Пусть кнопки смены цвета теперь создают обработчики на основе ChangeThemeContext,
       а не получают их через onPrevTheme и onNextTheme.
       Приберись в коде.
    8. Открой Developer Tools, и убедись, перестал происходить render в Top. Объясни, почему так.
    9. Перенеси Лондон в блок Top, за ним в блок Top перенеси Нью-Йорк, Париж и Пекин.
       А кнопки смены цвета перенеси в блок Bottom.
       Удобно ли было переносить эти компоненты сейчас?
   10. Если контекст используется часто, можно создать специальный HOC компонент, чтобы оборачивать компоненты в Consumer.
       Найди в themes.js Context и используй в качестве ThemeContext:
          const ThemeContext = themes.Context;
       Теперь ты можешь определить кнопку так:
          const ThemedButton = themes.withTheme(Button);
       Используй ее!
 */

type ColorsOfTimeProps = { timer: Timer };

const ColorsOfTime = ({ timer }: ColorsOfTimeProps) => {
  const [currentTime, setCurrentTime] = React.useState<Date | null>(null);
  const [theme, setTheme] = React.useState<Theme>(themes.red);

  React.useEffect(() => {
    const handleTimerUpdated = (currentTime: Date | null) => {
      setCurrentTime(currentTime);
    };
    timer.addUpdated(handleTimerUpdated);
    return () => {
      timer.removeUpdated(handleTimerUpdated);
    };
  }, []);

  const dispatchChangeTheme = (type: ChangeThemeType) => {
    let newTheme = null;
    switch (type) {
      case 'prev':
        newTheme = themes.getPrevTheme(theme);
        break;
      case 'next':
        newTheme = themes.getNextTheme(theme);
        break;
    }
    setTheme(newTheme);
  };

  return (
    <div className="page">
      <h1>Цвета времени</h1>
      <Top
        theme={theme}
        onPrevTheme={() => dispatchChangeTheme('prev')}
        onNextTheme={() => dispatchChangeTheme('next')}
      />
      <Middle currentTime={currentTime} theme={theme} />
      <Bottom currentTime={currentTime} />
    </div>
  );
};

type ChangeThemeType = 'next' | 'prev';

type TopProps = { theme: Theme; onPrevTheme: () => void; onNextTheme: () => void };

const Top = React.memo(({ theme, onPrevTheme, onNextTheme }: TopProps) => {
  registerRenderForDebug('Top');
  return (
    <div className="block">
      <Button value="← цвет" theme={theme} onClick={onPrevTheme} />
      <Button value="цвет →" theme={theme} onClick={onNextTheme} />
    </div>
  );
});

type MiddleProps = {
  currentTime: Date | null;
  theme: Theme;
};

const Middle = React.memo(({ theme, currentTime }: MiddleProps) => {
  return (
    <div className="block">
      <Card title="Цветное локальное" currentTime={currentTime} color={theme.foregroundColor} />
      <Card title="Серый Лондон" timezone={+0} currentTime={currentTime} />
    </div>
  );
});

type BottomProps = { currentTime: Date | null };

const Bottom = React.memo(({ currentTime }: BottomProps) => {
  return (
    <div className="block">
      <Card title="Синий Нью-Йорк" timezone={-4} currentTime={currentTime} color="blue" />
      <Card title="Зеленый Париж" timezone={+2} currentTime={currentTime} color="green" />
      <Card title="Красный Пекин" timezone={+8} currentTime={currentTime} color="red" />
    </div>
  );
});

type CardProps = { title: string; currentTime: Date | null; color?: string; timezone?: number };

const Card = React.memo(({ currentTime, timezone, color, title }: CardProps) => {
  registerRenderForDebug('Card');
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>
        <TimeDisplay time={timezone ? helpers.toTimezone(currentTime, timezone) : currentTime} color={color} />
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
