import React, { FC, useCallback } from 'react';
import { useActions } from '@/hooks/useActions';
import { IComment, ICommentFormData } from '@/models/comment';
import CommentService from '@/services/commentService';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentForm from './CommentForm';

interface CommentListProps {
    comments: IComment[];
}

const CommentsList: FC<CommentListProps> = ({ comments }) => {
    const { getArticleByID } = useActions();
    const params = useParams<{ articleId: string }>();

    const commentArticle = useCallback(async (commentFormData: ICommentFormData) => {
        await CommentService.addComment(commentFormData);
        getArticleByID(params.articleId);
    }, []);

    const upvote = useCallback(async (commentId: string) => {
        await CommentService.upvoteComment(commentId);
        getArticleByID(params.articleId);
    }, []);

    const downvote = useCallback(async (commentId: string) => {
        await CommentService.downvoteComment(commentId);
        getArticleByID(params.articleId);
    }, []);

    return comments ? (
        <div className='comment'>
            <h4 className='mb-4'>Comments ({comments.length})</h4>
            <CommentForm submit={commentArticle} />

            {comments
                .sort((a, b) => b.score - a.score)
                .map((comment) => (
                    <Comment
                        key={comment.commentId}
                        comment={comment}
                        upvote={upvote}
                        downvote={downvote}
                    />
                ))}
        </div>
    ) : null;
};

export default CommentsList;
