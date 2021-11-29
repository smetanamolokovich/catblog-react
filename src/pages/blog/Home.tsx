import React, { FC, useEffect } from 'react';
import ArticleList from '@/components/ArticleList';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Home: FC = () => {
    const { getArticles, setArticles } = useActions();
    const { articles, isFetching } = useTypedSelector((state) => state.article);

    useEffect(() => {
        getArticles();
        return () => {
            setArticles([]);
        };
    }, []);

    return (
        <Row>
            <h2 className='my-5'>Recent articles</h2>
            {isFetching ? (
                <div className='text-center'>
                    <Spinner animation='grow' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <ArticleList articles={articles} />
            )}
        </Row>
    );
};

export default Home;
