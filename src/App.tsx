import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/Navbar';
import { useActions } from '@/hooks/useActions';

import './App.css';

function App() {
    const { setIsAuth, setUser } = useActions();

    useEffect(() => {
        if (localStorage.getItem('isAuth')) {
            const username = localStorage.getItem('username');
            if (username) {
                setUser({ username, password: '' });
            }
            setIsAuth(true);
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
