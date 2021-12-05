import { useActions } from '@/hooks/useActions';
import React, { FC, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

interface AlertProps {
    msg: string;
    type: 'danger' | 'success';
    position:
        | 'top-start'
        | 'top-center'
        | 'top-end'
        | 'middle-start'
        | 'middle-center'
        | 'middle-end'
        | 'bottom-start'
        | 'bottom-center'
        | 'bottom-end';
}

const Alert: FC<AlertProps> = ({ msg, type, position }) => {
    const [show, setShow] = useState(true);
    const { setError } = useActions();

    useEffect(() => {
        return () => {
            setError('');
        };
    }, []);

    return (
        <ToastContainer position={position} className='p-3 position-fixed'>
            <Toast
                onClose={() => setShow(false)}
                show={show}
                delay={3000}
                autohide
                className='d-inline-block m-1'
                bg={type}
            >
                <Toast.Header>
                    <strong className='me-auto'>
                        {type === 'danger' ? 'Oop! Something is wrong!' : 'Yay! Success!'}
                    </strong>
                </Toast.Header>
                <Toast.Body className='text-white'>{msg}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default Alert;
