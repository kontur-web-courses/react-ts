import React, { FunctionComponent, useState } from "react";
import { Button, Input, Select, Gapped } from "@skbkontur/react-ui";
import { CustomModal } from "./CustomModal";

//Екатеринбург не пришёл на фан встречу :(
const cities = ["Липецк", "Троицк", "Новокузнецк", "Челябинск", "Владивосток"];
const maritalStatuses = ["Замужем", "Не замужем"];

type saveDataType = {
  name: string;
  surname: string;
  city: string | undefined;
}

export type prevCurrentData = {
  prev: saveDataType;
  curr: saveDataType;
}

export const App: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [city, setСity] = useState<string | undefined>(undefined);

  const [savedData, setSavedData] = useState<prevCurrentData>({
    prev: { city: "", name: "", surname: "" },
    curr: { city: "", name: "", surname: "" }
  });

  const toggleModal = (): void => {
    setOpenModal(!openModal);
  };

  const onChangeName = (e: string): void => {
    setName(e);
  };

  const onChangeSurname = (e: string): void => {
    setSurname(e);
  };

  const onChangeCity = (e: string): void => {
    setСity(e);
  };

  const saveData = (): void => {
    toggleModal();
    setSavedData({ curr: { name, surname, city }, prev: { ...savedData.curr } });
  };

  return (
    <div className={"wrapper"}>
      <Form name={name}
            surname={surname}
            saveData={saveData}
            onChangeName={onChangeName}
            onChangeSurname={onChangeSurname}
            city={city}
            onCityChange={onChangeCity}
      />
      {openModal ? <CustomModal toggleModal={toggleModal} diffData={savedData} /> : null}
    </div>
  );
};

type form = {
  saveData: () => void;
  onChangeName: (e: string) => void; //попался в ловушку ивентов React.BaseSyntheticEvent<HTMLInputElement>
  onChangeSurname: (e: string) => void; //а если мне нужно не только свойство e.target.value?
  onCityChange: (e: string) => void;
} & saveDataType

const Form: React.FC<form> = ({ saveData, name, surname, city, onCityChange, onChangeName, onChangeSurname }) => {
  return (
    <form>
      <Gapped vertical gap={15}>
        <h2>Информация о пользователе</h2>
        <label className={"form-label"}>
          <div className={"discr"}>
            Имя
          </div>
          <Input value={name} onValueChange={onChangeName} placeholder="Введите имя пользователя" />
        </label>
        <label className={"form-label"}>
          <div className={"discr"}>
            Фамилия
          </div>
          <Input value={surname} onValueChange={(e) => onChangeSurname(e)} placeholder="Введите фамилию пользователя" /></label>
        <label className={"form-label"}>
          <div className={"discr"}>Город</div>
          <Select<string>
            placeholder="Выберите город"
            items={cities}
            value={city}
            onValueChange={onCityChange}
          />
        </label>
        <Button onClick={saveData} use="primary" size="large">Сохранить</Button>
      </Gapped>
    </form>
  );
};
