import React, { FC, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ArticleList from '@/components/ArticleList';
import Loader from '@/components/Loader';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

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
            {isFetching ? <Loader animation='grow' /> : <ArticleList articles={articles} />}
        </Row>
    );
};

export default Home;
