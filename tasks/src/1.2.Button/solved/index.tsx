import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="root">
    <div className="form">
      <div style={{ marginBottom: '10px' }}>Нажми отправить</div>
      <input type="button" className="button" value="Отправить" onClick={() => alert('Отправлено')} />
    </div>
  </div>
);
