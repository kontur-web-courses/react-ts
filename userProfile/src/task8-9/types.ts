import React from "react";

export type form = {
  saveData: () => void;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  formInputs: allInputs;
}

type inputProps = {
  rus: string;
  rusPlaceholder: string;
  value: string;
  type: string;
  select?: Array<string>;
};

type allInputs = {
  name: inputProps;
  surname: inputProps;
  city: inputProps;
  phoneNumber: inputProps;
  nationality: inputProps;
  maritalStatus: inputProps;
  email: inputProps;
  dateOfBirth: inputProps;
};

type saveDataType = {
  name: string;
  surname: string;
  city: string;
  phoneNumber: string;
  nationality: string;
  maritalStatus: string;
  email: string;
  dateOfBirth: string;
};

export type prevCurrentDataType = {
  prev: saveDataType;
  curr: saveDataType;
};

export type AppState = {
  openModal: boolean,
  inputs: allInputs,
  prevCurrentData: prevCurrentDataType
};

export type customInputType = {
  value: string;
  rusDiscr: string;
  placeholder: string;
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
  key: string;
  id: string;
  type: string;
  select: Array<string>;
}
