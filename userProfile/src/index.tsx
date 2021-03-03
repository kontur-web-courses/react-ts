import './style.css';
import React, {ChangeEvent} from 'react';
import ReactDom from 'react-dom';
import {Button, Center, Input, Select, Gapped, Modal} from '@skbkontur/react-ui';

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

let items = [Select.static(() => <Select.Item>Not selectable</Select.Item>), 'Екатеринбург', 'Москва', 'Питер', 'Новосиб'];

interface FormValues {
  [key: string]: any,
}

interface UserFormState {
  values: FormValues,
  openedModal: Boolean,
}

class Form extends React.Component<{}, UserFormState> {
  private oldDateForm: FormValues = {};
  private modifiedData: React.ReactElement[] = [];

  constructor(props: {}) {
    super(props);

    const values: FormValues = {
      'userName': '',
      'userSurname': '',
      'city': '',
    };

    this.state = {
      values,
      openedModal: false,
    };
  }

  changeSelect = (value: any) => {
    const values = this.state.values;
    values['city'] = value;

    this.setState({ values });
  }

  change = (event: any) => {
    const values = this.state.values;
    const name: string = event.target.name;
    const value: any = event.target.value;
    values[name] = value;

    this.setState({ values });
  }

  submit = () => {
    this.modifiedData = this.getChangesDate(this.oldDateForm, this.state.values);
    this.updateOldDate(this.state.values);

    this.setState({openedModal: true});
  }

  closeModal = () => {
    this.setState({openedModal: false});
  }

  getChangesDate(oldDate: FormValues, newDate: FormValues) {
    const changes: React.ReactElement[] = [];

    for (const key of Object.keys(newDate)) {
      if (newDate[key] !== oldDate[key]) {
        changes.push(
          <p key={key}>{`Было: ${oldDate[key] || ''}, Стало: ${newDate[key] || ''}`}</p>
        )
      }
    }

    return changes;
  }

  updateOldDate(newDate: FormValues) {
    for (const key of Object.keys(newDate)) {
      this.oldDateForm[key] = newDate[key]
    }
  }

  render() {
    const {userName, userSurname} = this.state.values;

    return (
      <div>
        <form className="form">
          <Gapped vertical gap={16}>
            <h2 className="form__title">Информация о пользователе</h2>
            <div className="form__item">
                <label className="form__item-label" htmlFor="user-name">
                  Имя
                </label>
                <Input
                  value={userName}
                  onChange={this.change}
                  className="form__item-input"
                  name="userName"
                  id="user-name"/>
            </div>
            <div className="form__item">
              <label className="form__item-label" htmlFor="user-surname">
                Фамилия
              </label>
              <Input
                value={userSurname}
                onChange={this.change}
                className="form__item-input"
                id="user-surname"
                name="userSurname"/>
            </div>
            <div className="form__item">
              <label className="form__item-label" htmlFor="user-surname">
                Город
              </label>
              <Select
                placeholder="Выберите город"
                items={items}
                value={this.state.values.city}
                onValueChange={this.changeSelect} />
            </div>
            <Button
              onClick={this.submit}
              use="primary">
              Отправить
            </Button>
          </Gapped>
        </form>
        { this.state.openedModal &&
          <ModalForm close={this.closeModal} modifiedData={this.modifiedData}/>
        }
      </div>
    )
  }
}

interface ModalProps {
  close: () => void,
  modifiedData: React.ReactElement[],
}

class ModalForm extends React.Component<ModalProps, {}> {
  constructor(props: ModalProps) {
    super(props);

  }
  render() {
    return (
      <Modal onClose={this.props.close}>
        <Modal.Header>Пользователь сохранен</Modal.Header>
        <Modal.Body>
          <p>
            {this.props.modifiedData.length > 0 ? 'Измененные данные:' : 'Данные не изменились'}
          </p>
          {this.props.modifiedData}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}


class App extends React.Component {
  render() {
    return (
      <Center>
        <Form/>
      </Center>
    )
  }
}

ReactDom.render(
  <App/>,
  document.getElementById('root')
)
