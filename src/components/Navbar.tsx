import React, { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';

import { useHistory } from 'react-router';
import { RouteNames } from '@/router';

interface CustomToggleProps {
    avatar?: string;
    onClick: (e: React.MouseEvent) => void;
}

const CustomToggle = React.forwardRef<HTMLImageElement, CustomToggleProps>(
    ({ onClick, avatar }, ref) => (
        <div>
            <span style={{ color: '#2B2C37', fontSize: '9px', marginRight: '5px' }}>
                &#x25bc;
            </span>
            <Image
                ref={ref}
                onClick={onClick}
                src={avatar ? avatar : 'https://via.placeholder.com/32X32?text=?'}
                roundedCircle
                style={{ cursor: 'pointer' }}
            />
        </div>
    )
);

const Header: FC = () => {
    const router = useHistory();
    const auth = true;

    return (
        <header>
            <Navbar expand='lg'>
                <Container>
                    <Navbar.Brand href='#home'>Logo</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='me-auto' defaultActiveKey={RouteNames.HOME}>
                            <Nav.Link onClick={() => router.push(RouteNames.HOME)}>
                                Recent Articles
                            </Nav.Link>
                            <Nav.Link href='/link'>About</Nav.Link>
                        </Nav>
                        {auth ? (
                            <Nav className='justify-content-end'>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={() => router.push(RouteNames.ADMIN_PANEL)}
                                    >
                                        My articles
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link>Create article</Nav.Link>
                                </Nav.Item>
                                <Dropdown className='d-flex align-items-center ms-5'>
                                    <Dropdown.Toggle as={CustomToggle} id='dropdown-basic'>
                                        <Image
                                            src='https://via.placeholder.com/32X32?text=?'
                                            roundedCircle
                                        />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                                        <Dropdown.Item href='#/action-2'>
                                            Another action
                                        </Dropdown.Item>
                                        <Dropdown.Item href='#/action-3'>
                                            Something else
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        ) : (
                            <Nav className='justify-content-end'>
                                <Nav.Link onClick={() => router.push(RouteNames.LOGIN)}>
                                    Login
                                </Nav.Link>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
