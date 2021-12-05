import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/Navbar';
import { useActions } from '@/hooks/useActions';
import Alert from './components/Alert';

import './App.css';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
    const { setIsAuth, setUser, logout } = useActions();
    const { success, error } = useTypedSelector((state) => state.auth);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            const user = JSON.parse(userStr);

            if (user && user.expires < Date.now()) {
                logout();
            } else {
                setUser({ username: user.username, password: '' });
                setIsAuth(true);
            }
        }
    }, []);

    const renderAlert: () => JSX.Element | undefined = () => {
        if (success) {
            return <Alert msg={success} position='bottom-end' type='success' />;
        } else if (error) {
            return <Alert msg={error} position='bottom-end' type='danger' />;
        }
    };

    return (
        <>
            <Header />

            <Container className='main vh-100 '>
                <AppRouter />
            </Container>
            {renderAlert()}
        </>
    );
}

export default App;
