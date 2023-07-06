import React from 'react';

export type InputProps = React.ComponentPropsWithoutRef<'input'>;

export default class Input extends React.Component<InputProps> {
  private ref = React.createRef<HTMLInputElement>();

  render() {
    return <input ref={this.ref} {...this.props} />;
  }

  focus = () => {
    this.ref.current?.focus();
  };
}
