import React from "react";
import { form } from "./types";
import { Button, Gapped } from "@skbkontur/react-ui";
import { CustomInput } from "./CustomInput";

export const Form: React.FC<form> = ({ saveData, onChangeInput, formInputs }) => {
  const setInputs = () => {
    const Inputs: JSX.Element[] = [];
    for (const key in formInputs) {
      // @ts-ignore
      const { select, rusPlaceholder, type, rus, value } = formInputs[key];

      Inputs.push(<CustomInput select={select}
                               placeholder={rusPlaceholder}
                               type={type}
                               rusDiscr={rus}
                               id={key}
                               key={key}
                               value={value}
                               onChangeInput={onChangeInput}
      />);
    }

    return Inputs;
  };

  return (
    <form>
      <Gapped vertical gap={15}>
        <h2>Информация о пользователе</h2>
        {setInputs()}
        <Button onClick={saveData} use="primary" size="large">Сохранить</Button>
      </Gapped>
    </form>
  );
};
