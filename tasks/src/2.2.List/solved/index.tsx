import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

type Post = {
  id: string;
  author: string;
  time: string;
  message: string;
};

const posts: Post[] = [
  {
    id: '1',
    author: 'Парень не промах',
    time: '2 часа назад',
    message: 'Попробую с удовольствием ;)'
  },
  {
    id: '2',
    author: 'Милая девушка',
    time: '3 часа назад',
    message: 'Можно использовать для выпекания чизкейков :)'
  },
  {
    id: '3',
    author: 'Скупец',
    time: 'вчера',
    message: 'Цену-то загнули!'
  }
];

function renderPost(post: Post) {
  return (
    <div key={post.id} className="post">
      <div className="postHeader">
        <span className="postAuthor">{post.author}</span>
        <br />
        <span className="postTime">{post.time}</span>
      </div>
      <div className="postMessage">{post.message}</div>
    </div>
  );
}

function renderAuthors(posts: Post[]) {
  const authors = [];
  for (const post of posts) {
    authors.push(<span key={post.id}>{post.author}</span>);
  }
  return <div className="authors">{authors}</div>;
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="page">
    <div className="posts">{posts.map(post => renderPost(post))}</div>
    {renderAuthors(posts)}
  </div>
);
