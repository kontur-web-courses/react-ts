import React, { useState } from 'react';
import { cities } from '../data/cities';
import { Gapped, Input, Select } from "@skbkontur/react-ui";

export const Form: React.FC = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [city, setCity] = useState('');

    const getCities = () => cities.map(city => city.title);

    return (
        <form>
            <h2>Информация о пользователе</h2>
            <Gapped vertical gap={20}>
                <div>
                    <label htmlFor="name" className="label">
                        Имя
                    </label>
                    <Input id="name" type="text" value={name} />
                </div>
                <div>
                    <label htmlFor="surname" className="label">
                        Фамилия
                    </label>
                    <Input id="surname" type="text" value={surname} />
                </div>
                <div>
                    <label htmlFor="city" className="label">
                        Город
                    </label>
                    <Select items={getCities()} value={city} placeholder={'Выберите город'} />
                </div>
            </Gapped>
        </form>
    );
};
