import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

function renderLot(name: string, description: string) {
  return (
    <div className="lot">
      <div className="lotName">{name}</div>
      <div className="lotDescription">{description}</div>
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
    {renderLot('Форма для выпекания', 'Идеальна для приготовления десертов!')}
    <div className="posts">
      {renderPost('Парень не промах', '2 часа назад', 'Попробую с удовольствием ;)')}
      {renderPost('Милая девушка', '3 часа назад', 'Можно использовать для выпекания чизкейков :)')}
    </div>
  </div>
);
