import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
     Выдели метод отрисовки лота (renderLot), метод отрисовки поста (renderPost) и используй их.
 */

const renderLot = () => (
  <div className="lot">
    <div className="lotName">Форма для выпекания</div>
    <div className="lotDescription">Идеальна для приготовления десертов!</div>
  </div>
);

const renderPost = (author: string, time: string, message: string) => (
  <div className="post">
    <div className="postHeader">
      <span className="postAuthor">{author}</span>
      <br />
      <span className="postTime">{time}</span>
    </div>
    <div className="postMessage">{message}</div>
  </div>
);

ReactDom.render(
  <div className="page">
    {renderLot()}
    <div className="posts">
      {renderPost('Парень не промах', '2 часа назад', 'Попробую с удовольствием ;)')}
      {renderPost('Милая девушка', '3 часа назад', 'Можно использовать для выпекания чизкейков :)')}
    </div>
  </div>,
  document.getElementById('app')
);

/**
     Подсказки:
     - Чтобы вставить какое-то значение из JavaScript в верстку используй фигурные скобки:
       <div className={'star' + ' ' + 'person'}>{surname + ' ' + name}</div>
     - Воспринимай тэг верстки как литерал, описывающий значение некоторого типа данных.
         - Это значение можно положить в переменную или вернуть:
           const label = <span>Надпись</span>;
         - Из эстетических соображений возвращаемый тэг часто оборачивается в круглые скобки:
           return (
             <span>Надпись</span>
           );
     - Используй автоформатирование кода. Например, в Visual Studio Code оно вызывается сочетанием Shift+Alt+F
 */
