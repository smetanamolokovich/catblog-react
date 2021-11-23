import React, { FC, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { IUser } from '@/models/user';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
    const { isLoading } = useTypedSelector((state) => state.auth);
    const [user, setUser] = useState<IUser>({
        username: '',
        password: '',
    });
    const { login } = useActions();

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        login(user.username, user.password);
    };

    return (
        <Form onSubmit={submit} noValidate>
            <h2 className='mb-4'>Log In</h2>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    type='text'
                    placeholder='John Doe'
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    type='password'
                    placeholder='**********'
                />
            </Form.Group>

            <div className='text-right mt-4'>
                <Button variant='primary' type='submit' disabled={isLoading}>
                    {isLoading ? (
                        <Spinner
                            as='span'
                            animation='border'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                        />
                    ) : (
                        'Log in'
                    )}
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
