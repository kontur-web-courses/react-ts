import { Button, Modal } from '@skbkontur/react-ui';
import React from 'react';
import { FormDataContext, UserFormData } from '../../index';

type SuccessModalProps = { onClose: () => void };
type SuccessModalState = UserFormData;

export class SuccessModal extends React.Component<SuccessModalProps, SuccessModalState> {
    showChangedText(field: string, oldData = '<пусто>', newData = '<пусто>') {
        if (oldData !== newData) {
            return (
                <p>
                    {field}: было {oldData} стало {newData}
                </p>
            );
        }
    }

    render() {
        return (
            <Modal onClose={this.props.onClose}>
                <Modal.Header>Пользователь сохранён</Modal.Header>

                <Modal.Body>
                    <FormDataContext.Consumer>
                        {({ formData, oldFormData }) => {
                            return (
                                <div>
                                    <p>Изменённые данные</p>
                                    {this.showChangedText('Имя', oldFormData?.firstName, formData?.firstName)}
                                    {this.showChangedText('Фамилия', oldFormData?.lastName, formData?.lastName)}
                                    {this.showChangedText('Город', oldFormData?.city, formData?.city)}
                                </div>
                            );
                        }}
                    </FormDataContext.Consumer>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={this.props.onClose}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
