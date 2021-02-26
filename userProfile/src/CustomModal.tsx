import React, { Dispatch, SetStateAction } from "react";
import { Button, Modal } from "@skbkontur/react-ui";
import { prevCurrentData } from "./App";
import { createLogger } from "fork-ts-checker-webpack-plugin/lib/logger/LoggerFactory";

type modal = {
  toggleModal: () => void;
  diffData: prevCurrentData;
};

const propArray: Array<string> = ["Имя", "Город", "Фамилия"];

export const CustomModal: React.FC<modal> = ({ toggleModal, diffData: { prev, curr } }) => {

  const checkTheDifferent = (): Array<React.FC> | null => {
    const diffArray: Array<React.FC> = [];
    let counter: number = 0;
    Object.keys(prev).forEach(key => {
      // @ts-ignore // Вот встал вопрос, попробуй убрать тс игнор от сюда, как такого рода баг фиксить?) (в каком месте задавать тип)
      if (curr[key] !== prev[key] && prev[key]) {
        // @ts-ignore
        diffArray.push(<Difference prop={propArray[counter]} prevName={prev[key]} currName={curr[key]} />);
        counter++;
      }
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
