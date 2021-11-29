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

const Article = () => {
    const params = useParams<{ articleId: string }>();
    const { article } = useTypedSelector((state) => state.article);
    const [image, setImage] = useState<string>();
    const { setArticle } = useActions();

    useEffect(() => {
        fetchArticle();
        return () => {
            setArticle({} as IArticle);
        };
    }, []);

    const fetchArticle = async () => {
        const data = await ArticleService.getArticleByID(params.articleId);
        const img = await ImageService.getImageByID(data.imageId);
        setArticle(data);
        setImage(img);
    };

    return (
        <>
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
                <Col sm='4'>reacents</Col>
            </Row>
        </>
    );
};

export default Article;
