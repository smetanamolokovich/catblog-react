import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AdminTable from '@/components/AdminTable';
import { RouteNames } from '@/router';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import { useActions } from '@/hooks/useActions';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const AdminPanel: FC = () => {
    const router = useHistory();
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
            <div className='my-5 d-flex align-items-center'>
                <h2 className='me-5'>My articles</h2>

                <Button onClick={() => router.push(RouteNames.CREATE_ARTICLE)}>
                    Create new article
                </Button>
            </div>

            <AdminTable articles={articles} />
        </Row>
    );
};

export default AdminPanel;
