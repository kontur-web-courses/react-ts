import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';
import Toggle from '../Toggle';
import Input from '../Input';

type FormRowProps = { label: string; forwardedRef?: React.ForwardedRef<unknown> };

function createFormRow<T extends {}>(WrappedComponent: React.ComponentType<T>) {
  const FormRow = (props: T & FormRowProps) => {
    const { label, forwardedRef } = props;
    return (
      <div className="row">
        <div className="label">{label}</div>
        <WrappedComponent {...props} ref={forwardedRef} />
      </div>
    );
  };

  const wrappedName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  FormRow.displayName = `FormRow(${wrappedName})`;

  // forward.displayName = FormRow.displayName;
  return React.forwardRef((props: React.ComponentProps<typeof FormRow>, ref) => (
    <FormRow {...props} forwardedRef={ref} />
  ));
}

const InputFormRow = createFormRow(Input);
const ToggleFormRow = createFormRow(Toggle);

type FormState = {
  opened: boolean;
};

class Form extends React.Component<{}, FormState> {
  private firstRowRef = React.createRef<Input>();

  constructor(props: {}) {
    super(props);

    this.state = {
      opened: false
    };
  }

  render() {
    const { opened } = this.state;
    return (
      <div>
        {!opened && this.renderOpenButton()}
        {opened && this.renderForm()}
      </div>
    );
  }

  renderOpenButton() {
    return (
      <div className="openContainer">
        <input type="button" className="actionButton" value="Открыть" onClick={this.handleOpen} />
      </div>
    );
  }

  componentDidMount() {
    this.setFocusOnOpen();
  }

  componentDidUpdate() {
    this.setFocusOnOpen();
  }

  renderForm() {
    return (
      <div className="form">
        <form>
          <InputFormRow ref={this.firstRowRef} label="Фамилия" type="text" />
          <InputFormRow label="Имя" type="text" />
          <InputFormRow label="Отчество" type="text" />
          <ToggleFormRow label="Вегетарианец" />
        </form>
        <div className="saveContainer">
          <input type="submit" className="actionButton" value="Сохранить" onClick={this.handleSave} />
        </div>
      </div>
    );
  }

  handleOpen = () => {
    this.setState({
      opened: true
    });
  };

  handleSave = () => {
    this.setState({
      opened: false
    });
  };

  setFocusOnOpen = () => {
    if (this.state.opened) {
      // Проверка перед вызовом нужна,
      // пока this.firstRowRef не устанавливается корректно.
      this.firstRowRef?.current?.focus?.();
    }
  };
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Form />);
