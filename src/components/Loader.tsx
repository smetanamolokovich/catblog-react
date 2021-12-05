import React, { FC } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface LoaderProps {
    animation: 'border' | 'grow';
    sm?: 'sm';
    className?: string;
}

const Loader: FC<LoaderProps> = ({ sm, ...rest }) => {
    return (
        <div className='w-100 text-center'>
            <Spinner as='span' role='status' aria-hidden='true' size={sm} {...rest} />
        </div>
    );
};

export default Loader;
