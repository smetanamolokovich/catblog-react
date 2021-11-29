import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { IArticle } from '@/models/article';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import ImageService from '@/services/imageService';
import { useHistory } from 'react-router-dom';

interface ArticleItemProps {
    article: IArticle;
}

const ArticleItem: FC<ArticleItemProps> = ({ article }) => {
    const router = useHistory();
    const [image, setImage] = useState<string>('');

    useEffect(() => {
        fetchImage();

        return () => {
            setImage('');
        };
    }, []);

    const fetchImage = async () => {
        const img = await ImageService.getImageByID(article.imageId);
        setImage(img);
    };

    return (
        <Stack direction='horizontal' gap={4} className='mb-5' style={{ maxWidth: '860px' }}>
            <Image
                width={272}
                height={244}
                style={{ objectFit: 'cover' }}
                src={`${image}` || 'https://via.placeholder.com/274X244?text=?'}
            />
            <div className='align-self-start'>
                <h4>{article.title}</h4>
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
    );
};

export default ArticleItem;
