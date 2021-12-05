import React, { FC, FormEvent, useState } from 'react';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { ICommentFormData } from '@/models/comment';

interface CommentFormProps {
    submit: (data: ICommentFormData) => void;
}

const CommentForm: FC<CommentFormProps> = ({ submit }) => {
    const { user } = useTypedSelector((s) => s.auth);
    const params = useParams<{ articleId: string }>();
    const [comment, setComment] = useState('');

    const submitComment = async (e: FormEvent) => {
        e.preventDefault();

        if (user.username && comment) {
            submit({
                articleId: params.articleId,
                author: user.username,
                content: comment,
            });
        }

        setComment('');
    };

    return (
        <div className='d-flex bd-highlight mb-4 '>
            <Image
                src='https://via.placeholder.com/32X32?text=?'
                className='flex-shrink-1 me-4'
                roundedCircle
                width={44}
                height={44}
            />
            <Form className='w-100' onSubmit={submitComment}>
                <Form.Control
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    size='lg'
                    type='text'
                    placeholder='Join the discussion'
                    style={{ maxHeight: 44, minHeight: 'unset' }}
                />
            </Form>
        </div>
    );
};

export default CommentForm;
