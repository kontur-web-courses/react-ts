import React from 'react';
import { createRoot } from 'react-dom/client';
import EditUserForm from './EditUserForm';
import './styles.css';
import * as helpers from './helpers';
import defaultUsers, { User } from './defaultUsers';

/**
    Есть таблица гостей и форма для добавления гостя. В таблице отображена только основная информация.
    Всё работает, но неэффективно — при любом действии пользователя происходит множество лишних операций внутри React.

    В этом задании при вызове важных событий жизненного цикла выводятся сообщения в консоль.
    Эти сообщения можно увидеть в Developer Tools.

    Добейся того, чтобы лишние события не происходили.

    Допустимые события React:
    1. В начале происходит 6 событий и это нормально:
       UserTable render, UserTableRow render (2), UserTableRow mount (2), UserTable mount
    2. При добавлении новой строки должно быть 3 события:
       UserTable render, UserTableRow render и UserTableRow mount для новой строки
    3. При нажатии на кнопку изменить: никаких событий
    4. При сохранении после изменения видимого поля: UserTable render, UserTableRow render этого ряда
    5. При сохранении после изменения невидимого поля: UserTable render

    FYI, в коде использованы такие фишки JS:
    - «Spread-оператор для массива»
      Создает новый массив, причем сначала в него добавляются все элементы objs, а затем еще один элемент.
        [...objs, { id: 1 }]
    - «Spread-оператор для объекта»
      Создает новый объект, причем сначала заполняет его свойствами из obj, а затем добавляет новое свойство.
        { ...obj, key: value }
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

  const handleAddUser = () => {
    const newId = helpers.getNewId(users);
    updateGeneration();
    setUsers([{ id: newId }, ...users]);
  };

  const handleEditUser = (user: User) => {
    updateGeneration();
    setEditingUser(user);
  };

  const handleSaveUser = (user: User) => {
    updateGeneration();
    setEditingUser(null);
    setUsers(users.map(u => (u.id === user.id ? user : u)));
  };

  if (editingUser) {
    return (
      <div className="root">
        <EditUserForm user={editingUser} onSave={handleSaveUser} />
        <UserTable users={users} onEditUser={handleEditUser} onAddUser={handleAddUser} />
      </div>
    );
  }
  return (
    <div className="root">
      <UserTable users={users} onEditUser={handleEditUser} onAddUser={handleAddUser} />
    </div>
  );
};

const UserTable = ({ users, onEditUser, onAddUser }: UserTableProps) => {
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
          {users.map((user, index) => (
            <UserTableRow user={user} key={index} onEditUser={onEditUser} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onAddUser: () => void;
}

const UserTableRow = ({ user, onEditUser }: UserTableRowProps) => {
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
};

interface UserTableRowProps {
  user: User;
  onEditUser: (user: User) => void;
}

const domNode = document.getElementById('app') as HTMLElement;
const root = createRoot(domNode);
root.render(<Users />);

/**
    Подсказки:

    - React перерисовывает узлы по порядку.
      Если он увидит, что на месте div стоит span, то div будет полностью удален (unmount),
      даже если нужный div идет следом за этим span.
      Чтобы сохранить порядок узлов, оставляй «дырки» из null-узлов, undefined-узлов, false-узлов вот так:
        {showSpan && <span>A little hint</span>}
        <div>Main text</div>
      Если span не нужен, то вместо него встанет невидимый false-узел, а div останется на своем месте.

    - Изменение setState в компоненте приводит к его перерисовке. Часто вместе с детьми.
      Но если дочерний компонент наследует PureComponent, то он не будет перерисован
      если его props не поменялись. Это можно использовать для оптимизации рендеринга

    - Ключ к производительности — в правильном задании key.

    - В конце тебе пригодится shouldComponentUpdate(nextProps, nextState).
 */
