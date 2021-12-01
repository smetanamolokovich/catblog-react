import React, { FC, useEffect, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import ArticleForm from '@/components/ArticleForm';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';
import { IArticle, IArticleFormData } from '@/models/article';
import { RouteNames } from '@/router';

const UpdateArticle: FC = () => {
    const params = useParams<{ articleId: string }>();
    const router = useHistory();
    const buttonRef = useRef<HTMLInputElement | null>(null);
    const { article, image } = useTypedSelector((state) => state.article);
    const { getArticleByID, getImage, setArticle, setImage } = useActions();
    const { update } = useActions();

    useEffect(() => {
        getArticleByID(params.articleId);

        return () => {
            setArticle({} as IArticle);
        };
    }, []);

    useEffect(() => {
        if (article.imageId) getImage(article.imageId);

        return () => {
            setImage('');
        };
    }, [article]);

    const clickFromOutside = () => {
        buttonRef.current?.click();
    };

    const submitFromOutside = (data: IArticleFormData) => {
        update(data);
        router.push(RouteNames.ADMIN_PANEL);
    };

    return (
        <Row>
            <div className='my-5 d-flex align-items-center'>
                <h2 className='me-5'>Update article</h2>

                <Button onClick={() => clickFromOutside()}>Update article</Button>
            </div>
            <div style={{ maxWidth: '760px' }}>
                <ArticleForm
                    article={article}
                    img={image}
                    ref={buttonRef}
                    submitFn={submitFromOutside}
                />
            </div>
        </Row>
    );
};

export default UpdateArticle;
