import React from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    Не выделяя дополнительных методов
    1. Сделай так, чтобы renderPosts возвращал:
      - div с классом emptyPosts и текстом "Нет откликов",
        если posts пуст: <div className="emptyPosts">Нет откликов</div>
      - div с классом singlePost и текстом "Единственный отклик",
        если в posts ровно 1 элемент: <div className="singlePost">Единственный отклик</div>
      - div с классом posts в остальных случаях: <div className="posts">Отклики в количестве {posts.length}</div>
    2. Если name лота пустое или неопределено, то вместо него должна появляться надпись '<Неизвестный предмет>'
    3. Если description лота пустое или неопределено, то тэг с классом lotDescription должен отсутствовать
    4. Если у лота нет тэгов, то div с классом lotTags должен отсутствовать
 */

const renderPosts = (posts: string[]) =>
  posts.length === 0 ? (
    <div className="emptyPosts">Нет откликов</div>
  ) : posts.length === 1 ? (
    <div className="singlePost">Единственный отклик</div>
  ) : (
    <div className="posts">Отклики в количестве {posts.length}</div>
  );

const renderLot = (name: string, description: string | undefined, tags: string[]) => (
  <div className="lot">
    <div className="lotName">{name || '<Неизвестный предмет>'}</div>
    {description && <div className="lotDescription">{description}</div>}
    {tags && tags.length === 0 && <div className="lotTags">{tags.join(', ')}</div>}
  </div>
);

ReactDom.render(
  <div className="page">
    {renderLot('', '', [])}
    {renderPosts([])}
  </div>,
  document.getElementById('app')
);
