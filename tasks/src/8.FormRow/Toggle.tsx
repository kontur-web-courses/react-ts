import React from 'react';
import './toggle.css';

type ToggleState = { checked: boolean };

export type ToggleProps = React.ComponentPropsWithoutRef<'input'>;

export default class Toggle extends React.Component<ToggleProps, ToggleState> {
  private ref = React.createRef<HTMLSpanElement>();

  state = {
    checked: false
  };

  render() {
    const { checked } = this.state;
    return (
      <span
        ref={this.ref}
        tabIndex={0}
        className={'container' + (checked ? ' isChecked' : '')}
        onClick={this.handleClick}
      >
        <span className="handle">
          <div className="bg" />
          <span className="hinge" />
        </span>
      </span>
    );
  }

  handleClick = () => {
    this.setState({
      checked: !this.state.checked
    });
  };

  focus = () => {
    this.ref.current?.focus();
  };
}
