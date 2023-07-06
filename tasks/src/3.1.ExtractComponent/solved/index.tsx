import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
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

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <div className="posts">
      <Post author="Милая девушка" time="3 часа назад">
        Можно использовать для выпекания чизкейков :)
      </Post>
    </div>
  </div>
);
