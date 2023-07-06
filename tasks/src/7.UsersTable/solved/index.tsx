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
    Проблема 4. Написать свой propsAreEqual в UserTableRow все же придется,
                потому что редактирование невидимых полей не должно приводить к рендерингу.
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

const Users = () => {
  const [users, setUsers] = React.useState<User[]>(defaultUsers);
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const handleAddUser = React.useCallback(() => {
    const newId = helpers.getNewId(users);
    updateGeneration();
    setUsers([{ id: newId }, ...users]);
  }, [users]);

  const handleEditUser = React.useCallback((user: User) => {
    updateGeneration();
    setEditingUser(user);
  }, []);

  const handleSaveUser = React.useCallback(
    (user: User) => {
      updateGeneration();
      setEditingUser(null);
      setUsers(users.map(u => (u.id === user.id ? user : u)));
    },
    [users]
  );

  return (
    <div className="root">
      {editingUser && <EditUserForm user={editingUser} onSave={handleSaveUser} />}
      <UserTable users={users} onEditUser={handleEditUser} onAddUser={handleAddUser} />
    </div>
  );
};

const UserTable = React.memo(({ users, onEditUser, onAddUser }: UserTableProps) => {
  React.useEffect(() => {
    logEvent('UserTable\t\t did mount');
    return () => logEvent('UserTable\t\t will unmount');
  }, []);

  logEvent('UserTable\t\t render');

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
          {users.map(user => (
            <UserTableRow user={user} key={user.id} onEditUser={onEditUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onAddUser: () => void;
}

const UserTableRow = React.memo(
  ({ user, onEditUser }: UserTableRowProps) => {
    React.useEffect(() => {
      logEvent('UserTableRow\t did mount with id=' + user.id);
      return () => logEvent('UserTableRow\t will unmount with id=' + user.id);
    }, []);
    logEvent('UserTableRow\t render with id=' + user.id);

    const handleEditUser = () => {
      onEditUser(user);
    };

    return (
      <tr>
        <td>{user.surname}</td>
        <td>{user.firstName}</td>
        <td>{helpers.calculateAge(user.dateOfBirth)}</td>
        <td>
          <input className="editButton" type="button" onClick={handleEditUser} value="Изменить" />
        </td>
      </tr>
    );
  },
  (prevProps, nextProps) => {
    if (!prevProps) {
      return true;
    }

    const prevUser = prevProps.user;
    const nextUser = nextProps.user;

    return (
      prevUser.firstName === nextUser.firstName &&
      prevUser.surname === nextUser.surname &&
      prevUser.dateOfBirth === nextUser.dateOfBirth &&
      helpers.calculateAge(prevUser.dateOfBirth) === helpers.calculateAge(nextUser.dateOfBirth)
    );
  }
);

interface UserTableRowProps {
  user: User;
  onEditUser: (user: User) => void;
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Users />);
