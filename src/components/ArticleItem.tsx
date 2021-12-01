import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { IArticle } from '@/models/article';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ImageService from '@/services/imageService';
import { useHistory } from 'react-router-dom';
import { useWindowWidth } from '@/hooks/useWindowWidth';

interface ArticleItemProps {
    article: IArticle;
    plain?: boolean;
}

const ArticleItem: FC<ArticleItemProps> = ({ article, plain }) => {
    const router = useHistory();
    const [image, setImage] = useState<string>('');
    const width = useWindowWidth();

    useEffect(() => {
        if (!plain) {
            fetchImage();
        }
        return () => {
            setImage('');
        };
    }, []);

    const fetchImage = async () => {
        const img = await ImageService.getImageByID(article.imageId);
        setImage(img);
    };

    return !plain ? (
        <Stack
            direction={width < 800 ? 'vertical' : 'horizontal'}
            gap={4}
            className='mb-5'
            style={{ maxWidth: '860px' }}
        >
            <Image
                width={width < 800 ? '100%' : 272}
                height={244}
                style={{ objectFit: 'cover' }}
                src={`${image}` || 'https://via.placeholder.com/274X244?text=?'}
            />
            <div className='align-self-start'>
                <h4
                    role='button'
                    onClick={() => router.push('/articles/' + article.articleId)}
                >
                    {article.title}
                </h4>
                <div className='mb-2 text-secondary'>
                    Aituar &bull; {moment(article.createdAt).format('DD/MM/YYYY')}
                </div>
                <p className='mb-3'>{article.perex}</p>
                <Stack direction='horizontal' gap={3}>
                    <Button
                        variant='link'
                        onClick={() => router.push('/articles/' + article.articleId)}
                    >
                        Read whole article
                    </Button>
                    <div className='text-secondary'>{0} comments</div>
                </Stack>
            </div>
        </Stack>
    ) : (
        <Stack direction='horizontal' gap={2} className='mb-2' style={{ maxWidth: '860px' }}>
            <div className='align-self-start w-100'>
                <h4
                    role='button'
                    onClick={() => router.push('/articles/' + article.articleId)}
                    style={{ fontSize: '16px' }}
                >
                    {article.title}
                </h4>
                <p
                    className='mb-3 w-100 elipsis-multiple'
                    style={{ fontSize: '14px', maxHeight: '60px' }}
                >
                    {article.perex}
                </p>
            </div>
        </Stack>
    );
};

export default ArticleItem;
