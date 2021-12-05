import React, { FC } from 'react';
import Row from 'react-bootstrap/Row';
import { IArticle } from '@/models/article';
import ArticleItem from './ArticleItem';
import Loader from './Loader';
import { useTypedSelector } from '@/hooks/useTypedSelector';

interface ArticleListProps {
    articles: IArticle[];
    plain?: boolean;
    limit?: number;
    excludeID?: string;
}

const ArticleList: FC<ArticleListProps> = ({ articles, plain, limit, excludeID }) => {
    const { isFetching } = useTypedSelector((s) => s.article);

    return (
        <Row>
            {isFetching ? (
                <Loader animation='grow' />
            ) : (
                <>
                    {articles.length ? (
                        articles
                            .filter((el) => el.articleId !== excludeID)
                            .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
                            .slice(0, limit || articles.length - 1)
                            .map((item) => (
                                <ArticleItem
                                    key={item.articleId}
                                    article={item}
                                    plain={plain}
                                />
                            ))
                    ) : (
                        <h5 className='text-muted'>No articles published yet...</h5>
                    )}
                </>
            )}
        </Row>
    );
};

export default ArticleList;
