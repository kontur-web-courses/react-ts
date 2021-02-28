import './style.css';
import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';
import { ThemeContext, FLAT_THEME } from '@skbkontur/react-ui';
import { v4 as uuidv4 } from 'uuid';

type FormState = {
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    birthDate: string;
    birthCity: string;
    maritalStatus: string;
    citizenship: string;
    nationality: string;
    phoneNumber: string;
    gender: string;
    [index: string]: string;
};

function getEmptyFormState(): FormState {
    return {
        firstName: '',
        lastName: '',
        city: '',
        email: '',
        gender: '',
        birthDate: '',
        birthCity: '',
        maritalStatus: '',
        citizenship: '',
        nationality: '',
        phoneNumber: ''
    };
}
function getNothingFormState(): FormState {
    let state = getEmptyFormState();
    Object.keys(state).map(key => {
        state[key] = 'ничего';
    });
    return state;
}

function getSpecificInputPropsObject(
    labelName: string,
    inputPlaceHolder: string,
    valueKey: string
): SpecificInputProps {
    return { labelName, inputPlaceHolder, valueKey };
}

const specificInputData: SpecificInputProps[] = [
    getSpecificInputPropsObject('Почта', 'Введите почту пользователя', 'email'),
    getSpecificInputPropsObject('Дата рождения', 'Введите дату рождения', 'birthDate'),
    getSpecificInputPropsObject('Город рождения', 'Введите город рождения', 'birthCity'),
    getSpecificInputPropsObject('Cемейное положение', 'Введите cемейное положение', 'maritalStatus'),
    getSpecificInputPropsObject('Гражданство', 'Введите гражданство', 'citizenship'),
    getSpecificInputPropsObject('Национальность', 'Введите национальность', 'nationality'),
    getSpecificInputPropsObject('Номер телефона', 'Введите номер телефона', 'phoneNumber')
];
const CurrentStateContext = React.createContext<Partial<{ formState: FormState; changeFunction: any }>>({});
const MyForm = () => {
    const [isModalOpen, changeModalOpen] = useState(false);
    const [currentFormState, changeCurrentState] = useState<FormState>(getEmptyFormState());
    const [pastFormState, changePastState] = useState<FormState>(getNothingFormState());
    const [warningFirstNameAnimation, changeFirstNameAnimation] = useState(false);
    const [warningLastNameAnimation, changegLastNameAnimation] = useState(false);

    return (
        <ThemeContext.Provider value={FLAT_THEME}>
            <CurrentStateContext.Provider value={{ formState: currentFormState, changeFunction: changeCurrentState }}>
                {isModalOpen && (
                    <MyModal
                        changeOpenState={changeModalOpen}
                        pastState={pastFormState}
                        changePastState={changePastState}
                        currentState={currentFormState}
                    />
                )}
                <form>
                    <Gapped vertical>
                        <h2>Информация о пользователе</h2>
                        <WarningSpecificInput
                            ChangeWarningFunction={changeFirstNameAnimation}
                            warningState={warningFirstNameAnimation}
                            labelName={'Имя'}
                            inputPlaceHolder={'Введите имя пользователя'}
                            valueKey={'firstName'}
                        />
                        <WarningSpecificInput
                            ChangeWarningFunction={changegLastNameAnimation}
                            warningState={warningLastNameAnimation}
                            labelName={'Фамилия'}
                            inputPlaceHolder={'Введите фамилию пользователя'}
                            valueKey={'lastName'}
                        />

                        <SpecificSelect
                            labelName={'Город'}
                            itemSet={citySet}
                            inputPlaceHolder={'Выберите город'}
                            valueKey={'city'}
                        />
                        <SpecificSelect
                            labelName={'Гендер'}
                            itemSet={genderSet}
                            inputPlaceHolder={'Выберите гендер'}
                            valueKey={'gender'}
                        />
                        {specificInputData.map(data => (
                            <SpecificInput
                                labelName={data.labelName}
                                inputPlaceHolder={data.inputPlaceHolder}
                                valueKey={data.valueKey}
                                key={data.valueKey}
                            />
                        ))}

                        <Button
                            use="primary"
                            onClick={() => {
                                let noError = true;
                                if (currentFormState.firstName === '') {
                                    changeFirstNameAnimation(!warningFirstNameAnimation);
                                    noError = false;
                                }
                                if (currentFormState.lastName === '') {
                                    changegLastNameAnimation(!warningLastNameAnimation);
                                    noError = false;
                                }
                                if (noError) {
                                    changeModalOpen(true);
                                }
                            }}
                        >
                            Сохранить
                        </Button>
                    </Gapped>
                </form>
            </CurrentStateContext.Provider>
        </ThemeContext.Provider>
    );
};

const MyModal = (props?: any) => {
    const closeAction = () => {
        props.changePastState({ ...props.currentState });
        props.changeOpenState(false);
    };

    const diff = findDiff(props.currentState, props.pastState);
    return (
        <Modal onClose={closeAction}>
            <Modal.Header>Пользователь сохранен</Modal.Header>
            <Modal.Body>
                {diff.length > 0 ? <p>Измененные данные:</p> : <p>Изменений нет</p>}
                {diff.map(item => (
                    <p key={uuidv4()}>{item}</p>
                ))}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={closeAction}>Закрыть</Button>
            </Modal.Footer>
        </Modal>
    );
};

type SpecificInputProps = {
    labelName: string;
    inputPlaceHolder: string;
    valueKey: string;
};

const SpecificInput = (props: SpecificInputProps) => {
    return (
        <CurrentStateContext.Consumer>
            {stateInfo => (
                <label htmlFor="">
                    <span className="label">{props.labelName}</span>
                    <Input
                        placeholder={props.inputPlaceHolder}
                        onChange={e =>
                            stateInfo.changeFunction({ ...stateInfo.formState, [props.valueKey]: e.target.value })
                        }
                    ></Input>
                </label>
            )}
        </CurrentStateContext.Consumer>
    );
};

type SpecificSelectProps = {
    itemSet: string[];
} & SpecificInputProps;

const SpecificSelect = (props: SpecificSelectProps) => {
    return (
        <CurrentStateContext.Consumer>
            {stateInfo => (
                <label htmlFor="">
                    <span className="label">{props.labelName}</span>
                    <Select
                        items={props.itemSet}
                        placeholder={props.inputPlaceHolder}
                        onValueChange={(e: any) =>
                            stateInfo.changeFunction({ ...stateInfo.formState, [props.valueKey]: e })
                        }
                    ></Select>
                </label>
            )}
        </CurrentStateContext.Consumer>
    );
};

type WarningSpecificInputProps = {
    ChangeWarningFunction: (e: any) => void;
    warningState: boolean;
} & SpecificInputProps;

const WarningSpecificInput = (props: WarningSpecificInputProps) => {
    return (
        <CurrentStateContext.Consumer>
            {stateInfo => (
                <label
                    htmlFor=""
                    onAnimationEnd={() => props.ChangeWarningFunction(!props.warningState)}
                    className={props.warningState ? 'shake' : ''}
                >
                    <span className="label">{props.labelName}</span>
                    <Input
                        placeholder={props.inputPlaceHolder}
                        onChange={e =>
                            stateInfo.changeFunction({ ...stateInfo.formState, [props.valueKey]: e.target.value })
                        }
                    ></Input>
                </label>
            )}
        </CurrentStateContext.Consumer>
    );
};

function findDiff(currentState: FormState, pastState: FormState) {
    let diffArr = [];
    for (const key in currentState) {
        if (currentState[key] !== pastState[key])
            diffArr.push(key + ': было ' + pastState[key] + ', стало ' + currentState[key]);
    }
    return diffArr;
}

const citySet = ['Екб', 'Москва', 'Санкт-Петербург'];
const genderSet = ['М', 'Ж', 'Не определился'];

/**
 *  Итак, перед тобой пустой проект. Давай его чем-то заполним. Не стесняйся подсматривать в уже сделанные задачи,
 *  чтобы оттуда что-то скопировать.
 *
 *  1. Создай в файле index.html (он на уровень выше в файловой структуре) div с каким-нибудь id
 *  2. Импортируй сюда библиотеку React и ReactDom
 *  3. Отрендери "Hello world" на странице при помощи Реакта.
 *
 *  4. Добавь в разметку Button из библиотеки компонентов Контура (@skbkontur/react-ui).
 *     npm-пакет с библиотекой уже добавлен в проект.
 *
 *     Импортируется компонент на страницу так:
 *
 *     import Button from '@skbkontur/react-ui/Button';
 *
 *     Используется компонент так:
 *
 *     const MyApp = () => (
 *        <div>
 *            Click this button <Button onClick={() => console.log('Hey!')}>Click me</Button>
 *        </div>
 *     );
 *
 *
 *     Тут можно посмотреть, как компонентами пользоваться, какие у них атрибуты есть:
 *         http://tech.skbkontur.ru/react-ui/
 *
 *  5. Теперь, когда ты знаешь все основное, сверстай при помощи react-ui форму,
 *     как на картинке drafts/reactForm.png (можно открыть в браузере http://localhost:8080/drafts/reactForm.png)
 *     Для вертикальных отступов между элементами используй компонент Gapped из библиотеки.
 *     Если хочешь что-то стилизовать, используй файл style.css.
 *     Список городов придумай сам.
 *
 *  6. Сделай так, чтобы при клике по кнопке "Сохранить",
 *     показывалось модальное окно (компонент Modal из библиотеки) с текстом "Пользователь сохранен".
 *     выглядеть будет примерно как на картинке drafts/reactModal.png (http://localhost:8080/drafts/reactModal.png)
 *
 *  7. Сделай так, чтобы в той же модалке (в теле модального окна — Modal.Body) показывались изменения в полях.
 *     Смотри drafts/reactDiff.png (http://localhost:8080/drafts/reactDiff.png).
 *     Пример сообщения:
 *
 *       Измененные данные:
 *       Фамилия: было "Петров", стало "Петрова"
 *
 *     Для этого надо хранить где-то предыдущее (и текущее) значение. Придумай, как лучше это сделать.
 *
 *  8*. Необязательная задача.
 *      Сделай так, чтобы форма не сохранялась, если поле имя или фамилия не заполнено.
 *      Незаполненное поле должно анимацией покачаться из стороны в сторону (или придумай любой другой эффект).
 *
 *  9*. Необязательная задача.
 *      Добавь в эту форму еще поля: пол, дата рождения, город рождения, семейное положение,
 *      гражданство, национальность, номер телефона и адрес электронной почты.
 *      Придумай, как избежать излишнего дублирования.
 */

ReactDom.render(<MyForm />, document.getElementById('root'));
