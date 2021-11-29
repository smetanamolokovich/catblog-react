import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import { IArticle } from '@/models/article';
import ArticleItem from './ArticleItem';

interface ArticleListProps {
    articles: IArticle[];
}

const ArticleList: FC<ArticleListProps> = ({ articles }) => {
    return (
        <Row>
            {articles.length ? (
                articles
                    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .map((item) => <ArticleItem key={item.articleId} article={item} />)
            ) : (
                <h5 className='text-muted'>No articles published yet...</h5>
            )}
        </Row>
    );
};

export default ArticleList;
