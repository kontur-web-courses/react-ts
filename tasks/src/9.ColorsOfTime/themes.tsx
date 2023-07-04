import React from 'react';

export type Theme = {
  foregroundColor: string;
  backgroundColor: string;
};

export const red: Theme = {
  foregroundColor: 'red',
  backgroundColor: 'redBack'
};

export const yellow: Theme = {
  foregroundColor: 'yellow',
  backgroundColor: 'yellowBack'
};

export const green: Theme = {
  foregroundColor: 'green',
  backgroundColor: 'greenBack'
};

export const cyan: Theme = {
  foregroundColor: 'cyan',
  backgroundColor: 'cyanBack'
};

export const blue: Theme = {
  foregroundColor: 'blue',
  backgroundColor: 'blueBack'
};

export const magenta: Theme = {
  foregroundColor: 'magenta',
  backgroundColor: 'magentaBack'
};

export const all: Theme[] = [red, yellow, green, cyan, blue, magenta];

export function getPrevTheme(theme: Theme) {
  return all[(all.indexOf(theme) + all.length - 1) % all.length];
}

export function getNextTheme(theme: Theme) {
  return all[(all.indexOf(theme) + all.length + 1) % all.length];
}

// Пригодится в конце.
export const Context = React.createContext<Theme>(red);
export const Provider = Context.Provider;
export const Consumer = Context.Consumer;

export function withTheme<T extends { theme?: Theme }>(WrappedComponent: React.ComponentType<T>) {
  const Themed: React.FC<T> = props => {
    return <Consumer>{theme => <WrappedComponent {...props} theme={theme} />}</Consumer>;
  };

  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  Themed.displayName = `withTheme(${wrappedName})`;

  return Themed;
}
