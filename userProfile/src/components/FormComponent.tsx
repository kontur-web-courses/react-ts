import '../style.css';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped } from '@skbkontur/react-ui';
import ModalComponent from './ModalComponent';

type FormData = {
    name: string;
    lastName: string;
    city: string;
};

type InputProps = {
    label: string;
    placeHolder: string;
    valueKey: string;
};

type SelectProps = {
    itemSet: string[];
    label: string;
    placeHolder: string;
    valueKey: string;
};

const currentDataContext = React.createContext<Partial<{ formData: FormData; updateFunc: any }>>({});
const DataProvider = currentDataContext.Provider;
const DataConsumer = currentDataContext.Consumer;

const FormComponent = () => {
    const [isDisplayed, openModal] = useState(false);
    const [currentState, updateState] = useState<FormData>({
        name: '',
        lastName: '',
        city: ''
    });
    const [prevFormData, currentFormData] = useState<FormData>(initializeFormData());

    return (
        <DataProvider value={{ formData: currentState, updateFunc: updateState }}>
            {isDisplayed && (
                <ModalComponent
                    close={openModal}
                    prevData={prevFormData}
                    currentFormData={currentFormData}
                    currentData={currentState}
                />
            )}
            <form>
                <Gapped vertical>
                    <h2>Информация о пользователе</h2>
                    <InputComponent label={'Имя'} placeHolder={'Введите имя пользователя'} valueKey={'name'} />
                    <InputComponent
                        label={'Фамилия'}
                        placeHolder={'Введите фамилию пользователя'}
                        valueKey={'lastName'}
                    />

                    <SelectComponent
                        label={'Город'}
                        itemSet={cityList}
                        placeHolder={'Выберите город'}
                        valueKey={'city'}
                    />

                    <Button
                        use="primary"
                        size="large"
                        onClick={() => {
                            openModal(true);
                        }}
                    >
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        </DataProvider>
    );
};

const SelectComponent = (props: SelectProps) => {
    return (
        <DataConsumer>
            {dataInfo => (
                <label htmlFor="">
                    <span className="label">{props.label}</span>
                    <Select
                        items={props.itemSet}
                        placeholder={props.placeHolder}
                        onValueChange={(event: any) =>
                            dataInfo.updateFunc({ ...dataInfo.formData, [props.valueKey]: event })
                        }
                    ></Select>
                </label>
            )}
        </DataConsumer>
    );
};

const InputComponent = (props: InputProps) => {
    return (
        <DataConsumer>
            {dataInfo => (
                <Gapped gap={20}>
                    {/*gap не работает почему-то :<*/}
                    <label>
                        <span className="label">{props.label}</span>

                        <Input
                            placeholder={props.placeHolder}
                            onChange={event =>
                                dataInfo.updateFunc({ ...dataInfo.formData, [props.valueKey]: event.target.value })
                            }
                        ></Input>
                    </label>
                </Gapped>
            )}
        </DataConsumer>
    );
};

function initializeFormData(): FormData {
    let data = {
        name: '',
        lastName: '',
        city: ''
    };
    Object.keys(data).map(key => {
        data[key] = '';
    });
    return data;
}

const cityList = ['Москва', 'Тюмень', 'Санкт-Петербург', 'Екатеринбург', 'Нижний Новгород', 'Калининград'];

export default FormComponent;
