export interface User {
  id: number;
  surname?: string;
  firstName?: string;
  patronymic?: string;
  dateOfBirth?: Date;
  isVegetarian?: boolean;
  wishes?: string;
}

const defaultUsers: User[] = [
  {
    id: 0,
    surname: 'Иванов',
    firstName: 'Петр',
    patronymic: 'Сергеевич',
    dateOfBirth: new Date(2000, 10, 7),
    isVegetarian: false,
    wishes: ''
  },
  {
    id: 1,
    surname: 'Петров',
    firstName: 'Александр',
    patronymic: 'Дмитриевич',
    dateOfBirth: new Date(1998, 7, 5),
    isVegetarian: true,
    wishes: 'Хочу сидеть рядом с Петей'
  }
];

export default defaultUsers;
