import React, { FC, useEffect, useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { IComment } from '@/models/comment';
import moment from 'moment';
import CommentService from '@/services/commentService';

interface CommentProps {
    comment: IComment;
    upvote: (id: string) => void;
    downvote: (id: string) => void;
}

const Comment: FC<CommentProps> = ({ comment, upvote, downvote }) => {
    return (
        <div className='d-flex bd-highlight mb-4' style={{ fontSize: '16px' }}>
            <Image
                src='https://via.placeholder.com/32X32?text=?'
                className='flex-shrink-1'
                roundedCircle
                width={44}
                height={44}
            />
            <div className='px-4 text'>
                <div className='mb-2'>
                    <span className='commentator me-3 fw-bold'>{comment.author}</span>
                    <span className='commented-at text-muted' style={{ fontSize: '14px' }}>
                        {moment(comment.createdAt).fromNow()}
                    </span>
                </div>
                <p className='comment'>{comment.content}</p>
                <Stack direction='horizontal' className='mt-3'>
                    <div className='score'>{comment.score}</div>
                    <div className='vr mx-3'></div>
                    <div
                        role='button'
                        className='up-vote'
                        onClick={() => upvote(comment.commentId)}
                    >
                        <i className='bi bi-chevron-up'></i>
                    </div>
                    <div className='vr mx-3'></div>
                    <div
                        role='button'
                        className='down-vote'
                        onClick={() => downvote(comment.commentId)}
                    >
                        <i className='bi bi-chevron-down'></i>
                    </div>
                </Stack>
            </div>
        </div>
    );
};

export default Comment;
