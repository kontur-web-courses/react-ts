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

  return React.forwardRef((props: React.ComponentProps<typeof FormRow>, ref) => (
    <FormRow {...props} forwardedRef={ref} />
  ));
}

const InputFormRow = createFormRow(Input);
const ToggleFormRow = createFormRow(Toggle);

const Form = () => {
  const [opened, changeOpened] = React.useState(false);
  const firstRowRef = React.useRef<Input>();

  React.useEffect(() => {
    setFocusOnOpen();
  });

  const renderOpenButton = () => {
    return (
      <div className="openContainer">
        <input type="button" className="actionButton" value="Открыть" onClick={handleOpen} />
      </div>
    );
  };

  const renderForm = () => {
    return (
      <div className="form">
        <form>
          <InputFormRow ref={firstRowRef} label="Фамилия" type="text" />
          <InputFormRow label="Имя" type="text" />
          <InputFormRow label="Отчество" type="text" />
          <ToggleFormRow label="Вегетарианец" />
        </form>
        <div className="saveContainer">
          <input type="submit" className="actionButton" value="Сохранить" onClick={handleSave} />
        </div>
      </div>
    );
  };

  const handleOpen = () => {
    changeOpened(true);
  };

  const handleSave = () => {
    changeOpened(false);
  };

  const setFocusOnOpen = () => {
    if (opened) {
      // Проверка перед вызовом нужна,
      // пока this.firstRowRef не устанавливается корректно.
      firstRowRef?.current?.focus?.();
    }
  };

  return (
    <div>
      {!opened && renderOpenButton()}
      {opened && renderForm()}
    </div>
  );
};

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Form />);
