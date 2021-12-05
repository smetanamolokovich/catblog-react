import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { IArticle } from '@/models/article';
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import ArticleList from '@/components/ArticleList';
import CommentsList from '@/components/CommentsList';
import Loader from '@/components/Loader';

const Article = () => {
    const params = useParams<{ articleId: string }>();
    const { article, articles, image, isFetching } = useTypedSelector(
        (state) => state.article
    );
    const { setArticle, setArticles, setImage, getArticleByID } = useActions();

    useEffect(() => {
        getArticleByID(params.articleId);

        return () => {
            setArticle({} as IArticle);
            setArticles([]);
            setImage('');
        };
    }, []);

    return (
        <Row>
            <Col lg='8'>
                {isFetching ? (
                    <Loader animation='grow' className='mt-5' />
                ) : (
                    <>
                        <h2 className='mt-5'>{article.title}</h2>
                        <div className='mt-3 text-secondary'>
                            Aituar &bull; {moment(article.createdAt).format('DD/MM/YYYY')}
                        </div>
                        <Image
                            className='my-3 w-100'
                            src={image}
                            style={{ maxHeight: '500px', objectFit: 'cover' }}
                        />
                        <MDEditor.Markdown source={article.content} />
                        <hr className='my-5' />
                        <CommentsList comments={article.comments} />
                    </>
                )}
            </Col>
            <Col lg='4' className='p-5 '>
                <h4 className='mb-4'>Related articles</h4>
                {isFetching ? (
                    <Loader animation='grow' />
                ) : (
                    <ArticleList
                        articles={articles}
                        plain
                        limit={4}
                        excludeID={params.articleId}
                    />
                )}
            </Col>
        </Row>
    );
};

export default Article;
