import React from 'react';
import { Button, Gapped, Input, Select } from '@skbkontur/react-ui';
import { UserFormData } from '../../index';

type FormProps = { onSubmit: Function };
type FormState = UserFormData;

export class Form extends React.Component<FormProps, FormState> {
    private cities = ['Екатеринбург', 'Качканар', 'Москва'];

    render() {
        return (
            <form>
                <h1>Информация о пользователе</h1>
                <Gapped gap={20} vertical={true}>
                    <Gapped gap={80}>
                        <Gapped gap={20} vertical={true}>
                            <span>Имя</span>
                            <span>Фамилия</span>
                            <span>Город</span>
                        </Gapped>
                        <Gapped vertical={true}>
                            <Input
                                placeholder="Введите имя пользователя"
                                onChange={e => this.setState({ firstName: e.target.value })}
                            />
                            <Input
                                placeholder="Введите фамилию пользователя"
                                onChange={e => this.setState({ lastName: e.target.value })}
                            />
                            <Select
                                placeholder="Выберите город"
                                items={this.cities}
                                onValueChange={(city: {}) => this.setState({ city: city as string })}
                            />
                        </Gapped>
                    </Gapped>
                    <Button use="primary" onClick={() => this.props.onSubmit(this.state)}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    }
}
