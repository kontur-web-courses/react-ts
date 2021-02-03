import React, { FC } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    1. Переделай renderPost в функциональный компонент Post
       Для этого используй тип FC

    2. ESLint настроен так, чтобы проверять переданные атрибуты.
       У нас везде атрибуты — это строки. Сделай свойства author и time обязательными.

    3. Сделай так, чтобы в author подставлялось значение <Неизвестный автор>,
       если атрибут не передали.
       Проверь что работает, убрав имя автора.

    4. Переделай компонент так, чтобы message передавался через props.children.
 */
type Post = {
  author: string;
  time: string;
  message: string;
};

function renderPost(post: Post) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{post.author}</span>
        <br />
        <span className="postTime">{post.time}</span>
      </div>
      <div className="postMessage">{post.message}</div>
    </div>
  );
}

ReactDom.render(
  <div className="page">
    <div className="posts">
      {renderPost({
        author: 'Милая девушка',
        time: '3 часа назад',
        message: 'Можно использовать для выпекания чизкейков :)'
      })}
    </div>
  </div>,
  document.getElementById('app')
);

/**
    Подсказки к 1:
    - {renderMyComponent({a: 1, b: 'some'})} → <MyComponent a={1} b="some">
    - Первый аргумент функции компонента обычно называется props

    Подсказки к 2:
    type MyComponentProps = {
        requiredValue: string;
        optionalValue?: string;
    }

    Подсказки к 3:
    - const { b = 'defaultValue' } = props;

    Подсказки к 4:
    - Дети — это вложенные узлы тэга.
      Пример с одним ребенком: <MyComponent>Значение</MyComponent>
    - Дети попадают в props в виде массива props.children.
    const { children } = props;
 */
