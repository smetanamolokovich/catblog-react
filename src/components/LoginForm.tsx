import React, { FC } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { useFormInput } from '@/hooks/useFormInput';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
    const { isLoading } = useTypedSelector((state) => state.auth);
    const username = useFormInput('');
    const password = useFormInput('');
    const { login } = useActions();

    const submit = (event: React.FormEvent) => {
        event.preventDefault();

        login(username.value, password.value);
    };

    return (
        <Form onSubmit={submit} noValidate>
            <h2 className='mb-4'>Log In</h2>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control {...username} type='text' placeholder='John Doe' required />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control {...password} type='password' placeholder='**********' />
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
