import React from "react";
import { CustomModal } from "../CustomModal";
import { AppState } from "./types";
import { Form } from "../task8-9/Form";
import { cities, maritalStatuses } from "./consts";

export class App1 extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      openModal: false,
      prevCurrentData: {
        curr: {
          name: "",
          surname: "",
          city: "",
          dateOfBirth: "",
          email: "",
          maritalStatus: "",
          nationality: "",
          phoneNumber: ""
        },
        prev: {
          name: "",
          surname: "",
          city: "",
          dateOfBirth: "",
          email: "",
          maritalStatus: "",
          nationality: "",
          phoneNumber: ""
        }
      },
      inputs: {
        name: {
          rus: "Имя",
          rusPlaceholder: "Введите имя пользователя",
          value: "",
          type: "text"
        },
        surname: {
          rus: "Фамилия",
          rusPlaceholder: "Введите фамилию пользователя",
          value: "",
          type: "text"
        },
        city: {
          rus: "Город",
          rusPlaceholder: "Город пользователя",
          value: "",
          type: "select",
          select: cities
        },
        phoneNumber: {
          rus: "Телефон",
          rusPlaceholder: "8-800-555-35-35",
          value: "",
          type: "tel"
        },
        nationality: {
          rus: "Национальность",
          rusPlaceholder: "Национальность пользователя",
          value: "",
          type: "text"
        },
        maritalStatus: {
          rus: "Семейное положение",
          rusPlaceholder: "Семейное положение",
          value: "",
          type: "select",
          select: maritalStatuses
        },
        email: {
          rus: "Почта",
          rusPlaceholder: "Электронный адрес",
          value: "",
          type: "email"
        },
        dateOfBirth: {
          rus: "Дата рождения",
          rusPlaceholder: "",
          value: "",
          type: "date"
        }
      }

    };
  }

  onChangeInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    //ищем в состоянии свойство, по инпуту которого произошло изменение и меняем
    const discr = e.target.id;

    this.setState({
      inputs: {
        // @ts-ignore У меня много подобный присвоений, и я не знаю, хорошая или плохая это практика, напиши в лс пж, норм ли так делать, и есть не норм, то как лучше
        ...this.state.inputs, [discr]: { ...this.state.inputs[discr], value: e.target.value }
      }
    });
  };

  saveData = (): void => {


    let emptyInputsFlag = false;
    for (let key in this.state.inputs) {
      // @ts-ignore
      if (!this.state.inputs[key].value) {
        const input = document.getElementById(key);
        input?.classList.add("empty-input");

        setTimeout(() => {
          input?.classList.remove("empty-input");
        }, 1000);

        emptyInputsFlag = true;
      }
    }

    if (emptyInputsFlag) {
      return;
    }

    this.setState({
      prevCurrentData:
        {
          curr: {
            name: this.state.inputs.name.value,
            city: this.state.inputs.city.value,
            surname: this.state.inputs.surname.value,
            dateOfBirth: this.state.inputs.dateOfBirth.value,
            email: this.state.inputs.email.value,
            phoneNumber: this.state.inputs.phoneNumber.value,
            maritalStatus: this.state.inputs.maritalStatus.value,
            nationality: this.state.inputs.nationality.value
          },
          // @ts-ignore
          prev: { ...this.state.prevCurrentData?.curr }
        }
    });

    this.toggleModal();
  };

  toggleModal = (): void => {
    this.setState({ openModal: !this.state.openModal });
  };

  render() {
    return (
      <div className={"wrapper"}>
        <Form formInputs={this.state.inputs}
              onChangeInput={this.onChangeInput}
              saveData={this.saveData}
        />
        {this.state.openModal ?
          <CustomModal toggleModal={this.toggleModal} diffData={this.state.prevCurrentData} /> : null}
      </ div>
    );
  }
}








