import './style.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Button, Input, Gapped, Select, Modal } from '@skbkontur/react-ui';

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


type FormData = {
  name : string,
  surname : string,
  city : string
}

type FormState = {
  isModalOpen : boolean,
  current: FormData,
  saved: FormData
}


const defoultData = {
  name: " ",
  surname: " ",
  city: "Yekaterinburg"
}

const cities = ["Yekaterinburg", "Moscow", "Tokyo", "London", "Paris"]

class Form extends React.Component<{}, FormState>{

  constructor(props: FormState){
   super(props)
   this.state = {
    current : { ...defoultData },
    isModalOpen : false,
    saved : {...defoultData}
    }
  }
  
  render(){
    return <form>
    <div className="form">
      <Gapped vertical gap={30}>
        <p className="title">User information</p>
      </Gapped>
      <Gapped vertical gap={15}>
        { this.GetInputLable("Name", "Enter your name", this.currentUpdateHandler, "name") }
        { this.GetInputLable("Surname", "Enter your surname", this.currentUpdateHandler, "surname") }
        { this.GetSelectLable("City", cities , this.currentUpdateHandler, "city") }
        <div className="buttonwrap">
          <Button use="pay" size="medium"  onClick={() => this.openModal()}>Save</Button>
        </div>
      </Gapped>
      {this.state.isModalOpen && this.CreateModal()}
    </div>
    </form>
  }

  private currentUpdateHandler = (value: string, field: keyof FormData) =>{
    this.setState({ current: {...this.state.current, [field]: value}})
  }

  private GetSelectLable(lableText: string, selectData: string[], 
    handler: (value: string, field: keyof FormData) => void,
     field: keyof FormData){
    return <label>
        <div className="label">{lableText}</div> 
        <Select<string> use="success" value={this.state.current.city} items={selectData} onValueChange={value => handler(value, field)} ></Select>     
    </label>  
  }

  private GetInputLable(lableText: string, inputShadowText: string,
    handler: (value: string, field: keyof FormData) => void,
     field: keyof FormData): JSX.Element{
   return <label>
     <div className="label">{lableText}</div> 
      <Input  placeholder={inputShadowText} onChange={(event) => handler(event.target.value, field) }/> 
   </label>                
  }


  private CreateModal(){
     return (
     <Modal onClose={() => this.closeModal()} >
       <Modal.Header>User has been saved</Modal.Header>
       <Modal.Body>{this.GetComparationText()}</Modal.Body>
       <Modal.Footer>
         <Button use="pay" size="medium" onClick={() => this.closeModal()}>Close</Button>
       </Modal.Footer>
     </Modal>
     );
  }

  private closeModal(){
    this.setState({
      isModalOpen: false,
      saved: { ...this.state.current }
    })    
  }

  private openModal(){
    this.setState({isModalOpen: true})
  }

  private GetComparationText(){
    let changes = this.getChangesList(['name', 'surname', 'city'])
    let wasChanged = changes.some(fragment => fragment)
    return wasChanged 
    && <Gapped vertical gap={10}>
        {"Changes:"} 
        {changes}  
      </Gapped>
  }

  private getChangesList(fields: (keyof FormData)[]){
    let result = []
    for (const field of fields)
      result.push(this.getComparation(field))
    return result
  }

  private getComparation(field: keyof FormData){
    let current = this.state.current
    let saved = this.state.saved
    let text = current[field] !== saved[field] 
      ? `${saved[field]} => ${current[field]}`
      : null
    return text != null && <React.Fragment key={field}>
      {`${this.upFirstLetter(field)}: ${text} `} 
     </React.Fragment>       
  }

  private upFirstLetter = (str: string) => str ? str[0].toUpperCase() + str.slice(1) : str
}


ReactDom.render(
    <Form />,
    document.getElementById('firstDiv')
);
