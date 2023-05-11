import React, { ReactNode } from 'react';
import ReactDom from 'react-dom';
import './styles.css';

type PostProps = {
  author?: string;
  time: string;
  children?: ReactNode;
};

function Post({ author = '<Неизвестный автор>', time, children }: PostProps) {
  return (
    <div className="post">
      <div className="postHeader">
        <span className="postAuthor">{author}</span>
        <br />
        <span className="postTime">{time}</span>
      </div>
      <div className="postMessage">{children}</div>
    </div>
  );
}

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
