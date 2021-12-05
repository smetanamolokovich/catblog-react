import React from 'react';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { RouteNames } from '@/router';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
    const router = useHistory();
    return (
        <div className='mx-auto mt-5 w-75 text-center'>
            <Image src='https://i.imgur.com/oEUksmz.png' width={500} />
            <h2>Don’t Cry Over Spilled Page</h2>
            <Button
                variant='dark'
                className='mt-3'
                onClick={() => router.push(RouteNames.HOME)}
            >
                Go homepage
            </Button>
        </div>
    );
};

export default NotFound;
