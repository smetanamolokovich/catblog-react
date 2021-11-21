import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AppRouter from './components/AppRouter';
import Header from './components/Navbar';

import './App.css';

function App() {
    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col sm={8}>
                        <AppRouter />
                    </Col>
                    <Col sm={4}>side</Col>
                </Row>
            </Container>
        </>
    );
}

export default App;
