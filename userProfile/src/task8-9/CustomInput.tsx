import React from "react";
import { customInputType } from "./types";

export const CustomInput: React.FC<customInputType> = ({ value, select, type, id, rusDiscr, onChangeInput, placeholder }) => {
  if (type === "select") {
    return (
      <label className={"form-label"}>
        <div className={"discr"}>
          {rusDiscr}
        </div>
        <select className={"custom-input"} value={value} onChange={onChangeInput} id={id} placeholder={placeholder}>
          {select.map((option, index) => {
            return <option key={option} value={index ? option : ""}>{option}</option>;
          })}
        </select>
      </label>
    );
  }

  return (
    <label className={"form-label"}>
      <div className={"discr"}>
        {rusDiscr}
      </div>
      <input className={"custom-input"} type={type} onChange={onChangeInput} value={value} id={id}
             placeholder={placeholder} />
    </label>
  );
};
