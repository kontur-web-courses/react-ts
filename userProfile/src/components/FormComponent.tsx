import '../style.css';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';

type FormInfo = {
    name: string;
    lastName: string;
    city: string;
    [key: string]: string;
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

type ModalProps = {
    currentData: FormInfo;
    prevData: FormInfo;
    currentFormData(props: FormInfo): FormInfo;
    close(isClosed: boolean): void;
};

const ModalComponent = (props: ModalProps) => {
    const closeAction = () => {
        props.currentFormData({ ...props.currentData });
        props.close(false);
    };

    const updates = compareData(props.currentData, props.prevData);
    return (
        <Modal onClose={closeAction}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Body>
                {updates.length > 0 ? <p>Измененные данные:</p> : <p>Данные добавлены.</p>}
                {updates.map(item => (
                    <p key={item}>{item}</p>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeAction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

enum DataType {
    name = 'Имя',
    lastName = 'Фамилия',
    city = 'Город'
}

function compareData(currentData: FormInfo, prevData: FormInfo): string[] {
    let updates: string[] = [];
    for (const key in currentData) {
        if (prevData[key] && currentData[key] !== prevData[key])
            updates.push((DataType as any)[key] + ': было ' + prevData[key] + ', стало ' + currentData[key]);
    }
    return updates;
}

const currentDataContext = React.createContext<Partial<{ formData: FormInfo; updateFunc: any }>>({});
const DataProvider = currentDataContext.Provider;
const DataConsumer = currentDataContext.Consumer;

const FormComponent = () => {
    const [isDisplayed, openModal] = useState(false);
    const [currentState, updateState] = useState<FormInfo>({
        name: '',
        lastName: '',
        city: ''
    });
    const [prevFormData, currentFormData] = useState<FormInfo>(initializeFormData());

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

function initializeFormData(): FormInfo {
    let data = {
        name: '',
        lastName: '',
        city: ''
    };
    Object.keys(data).map(key => {
        (data as any)[key] = '';
    });
    return data;
}

const cityList = ['Москва', 'Тюмень', 'Санкт-Петербург', 'Екатеринбург', 'Нижний Новгород', 'Калининград'];

export default FormComponent;
