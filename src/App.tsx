import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/Navbar';
import { useActions } from '@/hooks/useActions';

import './App.css';

function App() {
    const { setIsAuth, setUser, logout } = useActions();

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

    return (
        <>
            <Header />

            <Container className='main'>
                <AppRouter />
            </Container>
        </>
    );
}

export default App;
