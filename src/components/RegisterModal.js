import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const RegisterModal = ({ isOpen, toggle }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Пароли не совпадают');
            return;
        }
        console.log('Выполнена регистрация:', { email, password });
        toggle();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Регистрация</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Введите email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Пароль</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Введите пароль"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Подтвердите Пароль</Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Подтвердите пароль"
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleRegister}>Зарегистрироваться</Button>{' '}
                <Button color="secondary" onClick={toggle}>Отмена</Button>
            </ModalFooter>
        </Modal>
    );
};

export default RegisterModal;
