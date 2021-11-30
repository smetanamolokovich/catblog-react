import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { ArticleService } from '@/services';
import { IArticle } from '@/models/article';
import ImageService from '@/services/imageService';
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import ArticleList from '@/components/ArticleList';

const Article = () => {
    const params = useParams<{ articleId: string }>();
    const { article, articles, isFetching } = useTypedSelector((state) => state.article);
    const [image, setImage] = useState<string>();
    const { setArticle, setArticles } = useActions();

    useEffect(() => {
        fetchArticle();

        return () => {
            setArticle({} as IArticle);
            setArticles([]);
            setImage('');
        };
    }, []);

    const fetchArticle = async () => {
        const article = await ArticleService.getArticleByID(params.articleId);
        const img = await ImageService.getImageByID(article.imageId);
        const artilces = await ArticleService.getArticles();

        setArticle(article);
        setImage(img);
        setArticles(artilces);
    };

    return (
        <Row>
            <Col sm='8'>
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
            </Col>
            <Col sm='4' className='p-5 '>
                <h4 className='mb-4'>Related articles</h4>
                <ArticleList articles={articles} plain />
            </Col>
        </Row>
    );
};

export default Article;
