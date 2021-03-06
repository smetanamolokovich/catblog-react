import React, { FC } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';

import { useHistory } from 'react-router';
import { RouteNames } from '@/router';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';

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
    const { isAuth, user } = useTypedSelector((state) => state.auth);
    const { logout } = useActions();

    return (
        <header>
            <Navbar bg='light' variant='light' expand='md'>
                <Container>
                    <Navbar.Brand role='button' onClick={() => router.push(RouteNames.HOME)}>
                        <img
                            src='/logo.png'
                            width='40'
                            height='45'
                            className='d-inline-block align-top'
                            alt='logo'
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav className='me-auto' defaultActiveKey={RouteNames.HOME}>
                            <Nav.Link onClick={() => router.push(RouteNames.HOME)}>
                                Recent Articles
                            </Nav.Link>
                            <Nav.Link onClick={() => router.push('/about')}>About</Nav.Link>
                        </Nav>
                        {isAuth ? (
                            <Nav className='justify-content-end'>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={() => router.push(RouteNames.ADMIN_PANEL)}
                                    >
                                        My articles
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={() => router.push(RouteNames.CREATE_ARTICLE)}
                                    >
                                        Create article
                                    </Nav.Link>
                                </Nav.Item>
                                <Dropdown.Item className='d-md-none px-0' onClick={logout}>
                                    Logout
                                </Dropdown.Item>

                                <Dropdown className='d-flex align-items-center ms-5 d-none d-md-block'>
                                    <Dropdown.Toggle as={CustomToggle} id='dropdown-basic' />

                                    <Dropdown.Menu style={{ left: '-100px' }}>
                                        {user.username ? (
                                            <Dropdown.Header>{user.username}</Dropdown.Header>
                                        ) : null}
                                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        ) : (
                            <Nav className='justify-content-end'>
                                <Nav.Link onClick={() => router.push(RouteNames.LOGIN)}>
                                    Login{' '}
                                    <i
                                        className='bi bi-arrow-right'
                                        style={{ fontSize: 'inherit', color: 'inherit' }}
                                    />
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
