import React from 'react';
import { createRoot } from 'react-dom/client';
import '../styles.css';
import EditUserForm from '../EditUserForm';
import * as helpers from '../helpers';
import defaultUsers, { User } from '../defaultUsers';

/**
    Проблемы в исходной версии.

    Проблема 1. Использовать editingUser &&, иначе лишние маунты при попытке редактирования.
    Проблема 2. UserTable надо сделать PureComponent, иначе при попытке редактирования таблица перерисовывается.
    Проблема 3. Использовать user.id вместо index.
                Чтобы помогло надо сначала UserTableRow сделать PureComponent,
                либо написать в нем собственный shouldComponentUpdate
                После этого добавление станет работать эффективнее.
    Проблема 4. Написать свой shouldComponentUpdate в UserTableRow все же придется,
                потому что редактирование невидимых полей не должно приводить к рендерингу.
                Заметь, что shouldComponentUpdate нельзя опредилить у PureComponent.
 */

let generation = 1;
let generationEvents = 1;

function updateGeneration() {
  generation++;
  generationEvents = 1;
}

function logEvent(msg: string) {
  console.log(` ${generation}.${generationEvents++}\t${msg}`);
}

class Users extends React.Component<{}, UserTableState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      users: defaultUsers,
      editingUser: null
    };
  }

  render() {
    const { users, editingUser } = this.state;
    return (
      <div className="root">
        {editingUser && <EditUserForm user={editingUser} onSave={this.handleSaveUser} />}
        <UserTable users={users} onEditUser={this.handleEditUser} onAddUser={this.handleAddUser} />
      </div>
    );
  }

  handleAddUser = () => {
    const newId = helpers.getNewId(this.state.users);
    updateGeneration();
    this.setState({
      users: [{ id: newId }, ...this.state.users]
    });
  };

  handleEditUser = (user: User) => {
    updateGeneration();
    this.setState({
      editingUser: user
    });
  };

  handleSaveUser = (user: User) => {
    updateGeneration();
    this.setState({
      editingUser: null,
      users: this.state.users.map(u => (u.id === user.id ? user : u))
    });
  };
}

class UserTable extends React.PureComponent<UserTableProps> {
  componentDidMount() {
    logEvent('UserTable\t\t did mount');
  }

  componentWillUnmount() {
    logEvent('UserTable\t\t will unmount');
  }

  render() {
    logEvent('UserTable\t\t render');
    const { users, onEditUser, onAddUser } = this.props;
    return (
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Возраст</th>
              <th>
                <input type="submit" className="editButton" value="Добавить" onClick={onAddUser} />
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map(user => (
              <UserTableRow user={user} key={user.id} onEditUser={onEditUser} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

interface UserTableProps {
  users?: User[];
  onEditUser: (user: User) => void;
  onAddUser?: () => void;
}

interface UserTableState {
  users: User[];
  editingUser: User | null;
}

class UserTableRow extends React.Component<UserTableRowProps> {
  componentDidMount() {
    logEvent('UserTableRow\t did mount with id=' + this.props.user.id);
  }

  componentWillUnmount() {
    logEvent('UserTableRow\t will unmount with id=' + this.props.user.id);
  }

  shouldComponentUpdate(nextProps: UserTableRowProps) {
    if (!this.props) {
      return true;
    }
    const prevUser = this.props.user;
    const nextUser = nextProps.user;
    return (
      prevUser.firstName !== nextUser.firstName ||
      prevUser.surname !== nextUser.surname ||
      (prevUser.dateOfBirth !== nextUser.dateOfBirth &&
        helpers.calculateAge(prevUser.dateOfBirth) !== helpers.calculateAge(nextUser.dateOfBirth))
    );
  }

  render() {
    const { user } = this.props;
    logEvent('UserTableRow\t render with id=' + user.id);
    return (
      <tr>
        <td>{user.surname}</td>
        <td>{user.firstName}</td>
        <td>{helpers.calculateAge(user.dateOfBirth)}</td>
        <td>
          <input className="editButton" type="button" onClick={this.handleEditUser} value="Изменить" />
        </td>
      </tr>
    );
  }

  handleEditUser = () => {
    this.props.onEditUser(this.props.user);
  };
}

interface UserTableRowProps {
  user: User;
  onEditUser: (user: User) => void;
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Users />);
