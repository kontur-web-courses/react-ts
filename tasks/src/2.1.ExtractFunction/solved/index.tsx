import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

function renderLot() {
  return (
    <div className="lot">
      <div className="lotName">Форма для выпекания</div>
      <div className="lotDescription">Идеальна для приготовления десертов!</div>
    </div>
  );
}

function renderPost(author: string, time: string, message: string) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{author}</span>
        <br />
        <span className="postTime">{time}</span>
      </div>
      <div className="postMessage">{message}</div>
    </div>
  );
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    {renderLot()}
    <div className="posts">
      {renderPost('Парень не промах', '2 часа назад', 'Попробую с удовольствием ;)')}
      {renderPost('Милая девушка', '3 часа назад', 'Можно использовать для выпекания чизкейков :)')}
    </div>
  </div>
);
