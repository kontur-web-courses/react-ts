/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import { FormState } from '../../types';

type FormProps = {
    cities: string[];
    state: FormState;
    onChange: (field: keyof FormState) => (value: string) => void;
    onSave: () => void;
};

const Form = (props: FormProps) => {
    const { cities, state, onChange, onSave } = props;
    return (
      <form>
          <Gapped vertical gap={15}>
              <label htmlFor="firstname">
                  <span className="label">Имя</span>
                  <Input
                      id="firstname"
                      placeholder="Введите имя пользователя"
                      value={state.firstname}
                      onValueChange={onChange(`firstname`)}
                  />
              </label>

              <label htmlFor="lastname">
                  <span className="label">Фамилия</span>
                  <Input
                      id="lastname"
                      placeholder="Введите фамилию пользователя"
                      value={state.lastname}
                      onValueChange={onChange(`lastname`)}
                  />
              </label>

              <label htmlFor="city">
                  <span className="label">Город</span>
                  <Select<string>
                      items={cities}
                      placeholder="Выберите город"
                      value={state.city}
                      onValueChange={onChange(`city`)}
                  />
              </label>
              <Button use="primary" onClick={onSave}>
                  Сохранить
              </Button>
          </Gapped>
        </form>
    );
};

export default Form;
