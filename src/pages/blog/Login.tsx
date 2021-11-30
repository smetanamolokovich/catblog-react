import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Alert from 'react-bootstrap/Alert';
import LoginForm from '@/components/LoginForm';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const LoginPageLayout: FC = ({ children }) => {
    const { error } = useTypedSelector((state) => state.auth);

    return (
        <Row>
            <Col>
                {error && (
                    <Alert variant='danger' className='mt-5 mx-auto w-50'>
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
