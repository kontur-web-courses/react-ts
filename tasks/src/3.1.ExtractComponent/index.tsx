import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

/**
    1. Переделай renderPost в функциональный компонент Post

    2. TypeScript проверяет переданные атрибуты.
       У нас везде атрибуты — это строки. Сделай свойства author и time обязательными,
       а message — необязательным.

    3. Сделай так, чтобы в author подставлялось значение <Неизвестный автор>,
       если атрибут не передали.
       Проверь что работает, убрав имя автора.

    4. Переделай компонент так, чтобы message передавался через props.children.
 */
type Post = {
  author?: string;
  time: string;
  children?: ReactNode;
};

const Post = ({ author = '<Неизвестный автор>', time, children }: Post) => (
  <div className="post">
    <div className="postHeader">
      <span className="postAuthor">{author}</span>
      <br />
      <span className="postTime">{time}</span>
    </div>
    <div className="postMessage">{children}</div>
  </div>
);


ReactDom.render(
  <div className="page">
    <div className="posts">
      <Post author="Милая девушка" time="3 часа назад">
        Можно использовать для выпекания чизкейков :)
      </Post>
    </div>
  </div>,
  document.getElementById('app')
);

/**
    Подсказки к 1:
    - {renderMyComponent({a: 1, b: 'some'})} → <MyComponent a={1} b="some">
    - Первый аргумент функции компонента обычно называется props, либо деконструируется

    Подсказки к 2:
    type MyComponentProps = {
        requiredValue: string;
        optionalValue?: string;
    }

    Подсказки к 3:
    - В типе Props надо сделать необязательными все ключи,
    для которых предполагается значение по умолчанию
    type MyComponentProps = {
        valueWithDefault?: string;
    }
    - Деконструкция параметра функции позволяет указывать значения по умолчанию
    function MyComponent({valueWithDefault = 'по умолчанию'}: MyComponentProps)

    Подсказки к 4:
    - Дети — это вложенные узлы тэга.
      Пример с одним ребенком: <MyComponent>Значение</MyComponent>
    - Дети попадают в props в виде массива props.children.
    - Для типизации Props нужно добавить опциональное свойство children с типом ReactNode
    type MyComponentProps = {
        requiredValue: string;
        optionalValue?: string;
        children?: ReactNode;
    }
 */
