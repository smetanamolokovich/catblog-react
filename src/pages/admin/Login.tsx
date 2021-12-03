import React, { FC, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import LoginForm from '@/components/LoginForm';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';

const LoginPageLayout: FC = ({ children }) => {
    const { error } = useTypedSelector((state) => state.auth);
    const { setError } = useActions();

    return (
        <Row>
            <Col>
                {error && (
                    <Alert
                        variant='danger'
                        onClose={() => setError('')}
                        dismissible
                        className='mt-5 mx-auto w-50'
                    >
                        {error}
                    </Alert>
                )}

                {children}
            </Col>
        </Row>
    );
};

const Login: FC = () => {
    return (
        <LoginPageLayout>
            <div
                className='shadow p-3 mx-auto mt-5 bg-body rounded'
                style={{ maxWidth: '368px' }}
            >
                <LoginForm />
            </div>
        </LoginPageLayout>
    );
};

export default Login;
