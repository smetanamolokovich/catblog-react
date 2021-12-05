import React, { FC, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import ArticleList from '@/components/ArticleList';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const Home: FC = () => {
    const { getArticles, setArticles } = useActions();
    const { articles } = useTypedSelector((state) => state.article);

    useEffect(() => {
        getArticles();
        return () => {
            setArticles([]);
        };
    }, []);

    return (
        <Row>
            <h2 className='my-5'>Recent articles</h2>
            <ArticleList articles={articles} />
        </Row>
    );
};

export default Home;
