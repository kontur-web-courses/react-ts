import React from 'react';
import './styles.css';
import { Theme } from './themes';

type ButtonProps = { value: string; theme?: Theme; onClick: () => void };

export default function Button({ value, theme, onClick }: ButtonProps) {
  return (
    <input
      className={`button ${theme?.backgroundColor || ''} ${theme?.foregroundColor || ''}`}
      type="button"
      value={value}
      onClick={onClick}
    />
  );
}
