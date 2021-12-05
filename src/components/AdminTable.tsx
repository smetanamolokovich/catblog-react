import React, { FC, useCallback } from 'react';
import { IArticle } from '@/models/article';
import Table from 'react-bootstrap/Table';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import { useActions } from '@/hooks/useActions';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '@/router';

interface AdminTableProps {
    articles: IArticle[];
}

const AdminTable: FC<AdminTableProps> = ({ articles }) => {
    const { removeArticle } = useActions();
    const router = useHistory();

    const handleRemove = useCallback((id: string) => {
        removeArticle(id);
    }, []);

    return (
        <Table responsive='lg'>
            <thead>
                <tr>
                    <th>Article title</th>
                    <th>Perex</th>
                    <th>Author</th>
                    <th># of comments</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article) => (
                    <tr key={article.articleId}>
                        <td>
                            <div className='elipsis-single' style={{ maxWidth: '250px' }}>
                                {article.title}
                            </div>
                        </td>
                        <td>
                            <div className='elipsis-single' style={{ maxWidth: '420px' }}>
                                {article.perex}
                            </div>
                        </td>
                        <td>
                            <div style={{ minWidth: '163px' }}>aituar</div>
                        </td>
                        <td>
                            <div style={{ minWidth: '163px' }}>
                                {article.comments?.length || 0}
                            </div>
                        </td>
                        <td>
                            <Stack direction='horizontal' gap={0}>
                                <Button
                                    onClick={() =>
                                        router.push(
                                            RouteNames.UPDATE_ARTICLE.replace(
                                                ':articleId',
                                                article.articleId
                                            )
                                        )
                                    }
                                    className='btn-light'
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: '20px',
                                        border: 'none',
                                    }}
                                >
                                    <i className='bi bi-pencil'></i>
                                </Button>
                                <Button
                                    onClick={() => handleRemove(article.articleId)}
                                    className='btn-light'
                                    style={{
                                        backgroundColor: 'white',
                                        fontSize: '20px',
                                        border: 'none',
                                    }}
                                >
                                    <i className='bi bi-trash'></i>
                                </Button>
                            </Stack>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default AdminTable;
