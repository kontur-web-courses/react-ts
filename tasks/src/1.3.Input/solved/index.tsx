import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';

let userName = 'По умолчанию';

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(
  <div className="root">
    <div className="form">
      <div style={{ paddingRight: '10px', display: 'inline-block' }}>
        <label htmlFor="name">Имя</label>
      </div>
      <input
        id="name"
        type="text"
        size={39}
        onChange={event => {
          userName = event.target.value;
        }}
        onBlur={() => alert(`userName: ${userName}`)}
      />
    </div>
  </div>
);
