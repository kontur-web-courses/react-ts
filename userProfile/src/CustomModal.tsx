import React from "react";
import { Button, Modal } from "@skbkontur/react-ui";
import { prevCurrentData } from "./App";
import { prevCurrentDataType } from "./task8-9/types";
import { propArray } from "./task8-9/consts";

type modal = {
  toggleModal: () => void;
  diffData: prevCurrentData | prevCurrentDataType;
};

export const CustomModal: React.FC<modal> = ({ toggleModal, diffData: { prev, curr } }) => {
  const checkTheDifferent = (): JSX.Element | null => {
    const diffArray: Array<React.FC> = [];
    let counter: number = 0;
    Object.keys(prev).forEach((key, index) => {
      // У меня много подобного
      // @ts-ignore // Вот встал вопрос, попробуй убрать тс игнор от сюда, как такого рода баг фиксить?) (в каком месте задавать тип)
      if (curr[key] !== prev[key] && prev[key]) {
        // @ts-ignore
        diffArray.push(<Difference key={key} prop={propArray[index]} prevName={prev[key]} currName={curr[key]} />);
      }
      counter++;
    });

    if (!diffArray.length) {
      return null;
    }

    return (<>
      <h3>Измененные данные:</h3>
      {diffArray.map(diff => diff)}
    </>);
  };

  return (
    <Modal onClose={toggleModal}>
      <Modal.Header>
        <strong>Пользователь сохранён</strong>
      </Modal.Header>
      <Modal.Body>
        {checkTheDifferent() || "Данные не изменены."}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={toggleModal}>Закрыть</Button>
      </Modal.Footer>

    </Modal>
  );
};

type differenceType = {
  prevName: string;
  currName: string;
  prop: string;
}

const Difference: React.FC<differenceType> = ({ currName, prevName, prop }) => {
  return <label style={{ display: "block" }}>
    {prop}: было: {prevName}, стало: {currName}
  </label>;
};
