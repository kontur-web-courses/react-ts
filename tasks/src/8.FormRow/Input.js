import React from 'react';

export default class Input extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  render() {
    return <input ref={this.ref} {...this.props} />;
  }

  focus = () => {
    this.ref.current.focus();
  };
}
