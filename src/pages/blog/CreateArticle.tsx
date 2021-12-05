import React, { FC, useRef } from 'react';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import ArticleForm from '@/components/ArticleForm';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '@/router';
import { useActions } from '@/hooks/useActions';
import { IArticleFormData } from '@/models/article';

const CreateArticle: FC = () => {
    const router = useHistory();
    const { publish } = useActions();
    const buttonRef = useRef<HTMLInputElement | null>(null);

    const clickFromOutside = () => {
        buttonRef.current?.click();
    };

    const submitFromOutside = (data: IArticleFormData) => {
        publish(data);
        router.push(RouteNames.HOME);
    };

    return (
        <Row>
            <div className='my-5 d-flex align-items-center'>
                <h2 className='me-5'>Create new article</h2>

                <Button onClick={() => clickFromOutside()}>Publish article</Button>
            </div>
            <div style={{ maxWidth: '760px' }}>
                <ArticleForm ref={buttonRef} submitFn={submitFromOutside} />
            </div>
        </Row>
    );
};

export default CreateArticle;
