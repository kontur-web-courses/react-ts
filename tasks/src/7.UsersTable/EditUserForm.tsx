import React from 'react';
import * as helpers from './helpers';
import { User } from './defaultUsers';

type EditUserFormProps = {
  user: User;
  onSave: (user: User) => void;
};

export default function EditUserForm(props: EditUserFormProps) {
  const [user, changeUser] = React.useState<User>({} as User);
  const [changed, setChanged] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (props.user && user !== props.user && !changed) {
      changeUser(props.user);
    }
  }, [props.user]);

  const handleUserChange = (change: Partial<User>) => {
    setChanged(true);
    changeUser({ ...user, ...change });
  };

  const handleSave = () => {
    if (user) {
      props.onSave(user);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSave}>
        <div className="row">
          <div className="label">Фамилия</div>
          <input type="text" value={user.surname || ''} onChange={e => handleUserChange({ surname: e.target.value })} />
        </div>
        <div className="row">
          <div className="label">Имя</div>
          <input
            type="text"
            value={user.firstName || ''}
            onChange={e => handleUserChange({ firstName: e.target.value })}
          />
        </div>
        <div className="row">
          <div className="label">Отчество</div>
          <input
            type="text"
            value={user.patronymic || ''}
            onChange={e => handleUserChange({ patronymic: e.target.value })}
          />
        </div>
        <div className="row">
          <div className="label">Дата рождения</div>
          <input
            type="date"
            value={helpers.formatDate(user.dateOfBirth)}
            onChange={e => handleUserChange({ dateOfBirth: new Date(e.target.value) })}
          />
        </div>
        <div className="row">
          <div className="label">Вегетарианец</div>
          <input
            type="checkbox"
            checked={user.isVegetarian || false}
            onChange={e => handleUserChange({ isVegetarian: e.target.checked })}
          />
        </div>
        <div className="row">
          <div className="label">Пожелания</div>
          <input type="text" value={user.wishes || ''} onChange={e => handleUserChange({ wishes: e.target.value })} />
        </div>
      </form>
      <div className="saveContainer">
        <input type="submit" className="actionButton" value="Сохранить" onClick={handleSave} />
      </div>
    </div>
  );
}
