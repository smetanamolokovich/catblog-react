import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import { IArticle } from '@/models/article';
import ArticleItem from './ArticleItem';

interface ArticleListProps {
    articles: IArticle[];
    plain?: boolean;
    limit?: number;
    excludeID?: string;
}

const ArticleList: FC<ArticleListProps> = ({ articles, plain, limit, excludeID }) => {
    return (
        <Row>
            {articles.length ? (
                articles
                    .filter((el) => el.articleId !== excludeID)
                    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                    .slice(0, limit || articles.length - 1)
                    .map((item) => (
                        <ArticleItem key={item.articleId} article={item} plain={plain} />
                    ))
            ) : (
                <h5 className='text-muted'>No articles published yet...</h5>
            )}
        </Row>
    );
};

export default ArticleList;
