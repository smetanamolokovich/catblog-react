import React, { FC } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import LoginForm from '@/components/LoginForm';

const LoginPageLayout: FC = ({ children }) => {
    return (
        <Row>
            <Col>{children}</Col>
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
