import React from 'react';
import { Button, Input, Select, Gapped, Modal } from '@skbkontur/react-ui';

type FormData = {
    name: string;
    surname: string;
    city: string;
};

type FormState = {
    modalOpened: boolean;
    saved: FormData;
    current: FormData;
};

const defaultData = {
    name: '',
    surname: '',
    city: 'Екатеринбург'
};

const cities = ['Москва', 'Урюпинск', 'Новосибирск', 'Екатеринбург', 'Тагиииил'];

export default class Form extends React.Component<{}, FormState> {
    public state: FormState = {
        modalOpened: false,
        saved: { ...defaultData },
        current: { ...defaultData }
    };

    public render() {
        const { modalOpened } = this.state;
        return (
            <div>
                <h2>Информация о пользователе</h2>
                {this.renderForm()}
                {modalOpened && this.renderModal()}
            </div>
        );
    }

    private renderForm() {
        const { name, surname, city } = this.state.current;
        return (
            <form>
                <Gapped gap={15} vertical>
                    <label>
                        <div className="label">Имя</div>
                        <Input
                            placeholder="Введите имя пользователя"
                            value={name}
                            onValueChange={this.onChange('name')}
                        />
                    </label>
                    <label>
                        <div className="label">Фамилия</div>
                        <Input
                            placeholder="Введите фамилию пользователя"
                            value={surname}
                            onValueChange={this.onChange('surname')}
                        />
                    </label>
                    <label>
                        <div className="label">Город</div>
                        <Select<string>
                            placeholder="Выберите город"
                            items={cities}
                            value={city}
                            onValueChange={this.onChange('city')}
                        />
                    </label>
                    <Button use="primary" size="large" onClick={this.openModal}>
                        Сохранить
                    </Button>
                </Gapped>
            </form>
        );
    }

    private renderModal() {
        const { saved, current } = this.state;
        const isNothingChanged = (Object.keys(current) as (keyof FormData)[]).every(key => saved[key] === current[key]);
        return (
            <Modal onClose={this.closeModal}>
                <Modal.Header>Пользователь сохранен</Modal.Header>
                <Modal.Body>
                    <p>Измененные данные:</p>
                    {isNothingChanged ? 'ничего' : this.renderChanges()}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    private renderChanges() {
        return (
            <p>
                {this.renderDiff('name', 'Имя')}
                {this.renderDiff('surname', 'Фамилия')}
                {this.renderDiff('city', 'Город')}
            </p>
        );
    }

    private renderDiff(field: keyof FormData, fieldName: string) {
        const { current, saved } = this.state;

        if (current[field] === saved[field]) {
            return null;
        }

        return (
            <React.Fragment>
                {fieldName}: было {saved[field] || '*ничего*'}, стало {current[field] || '*ничего*'} <br />
            </React.Fragment>
        );
    }

    private openModal = () => {
        this.setState({
            modalOpened: true
        });
    };

    private closeModal = () => {
        this.setState({
            modalOpened: false,
            saved: { ...this.state.current }
        });
    };

    private onChange = (field: keyof FormData) => {
        return (value: string) => {
            this.setState({
                current: {
                    ...this.state.current,
                    [field]: value
                }
            });
        };
    };
}
