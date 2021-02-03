import React from 'react';
import ReactDom from 'react-dom';
import '../styles.css';
import '../toggle.css';

type ToggleProps = {
  onChange(value: boolean): void;
};

type ToggleState = {
  checked: boolean;
};

class Toggle extends React.Component<ToggleProps, ToggleState> {
  constructor(props: ToggleProps) {
    super(props);
    this.state = {
      checked: false
    };
  }

  render() {
    const { checked } = this.state;
    return (
      <span className={'container' + (checked ? ' isChecked' : '')} onClick={this.handleClick}>
        <span className="handle">
          <div className="bg" />
          <span className="hinge" />
        </span>
      </span>
    );
  }

  handleClick = () => {
    const newChecked = !this.state.checked;
    if (this.props.onChange) {
      this.props.onChange(newChecked);
    }
    this.setState({
      checked: newChecked
    });
  };
}

ReactDom.render(
  <div className="page">
    <Toggle onChange={value => console.log(value)} /> Использовать умные компоненты
  </div>,
  document.getElementById('app')
);
