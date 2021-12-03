import { IComment, ICommentFormData } from '@/models/comment';
import { authHeader } from '@/utils/auth';
import axios from 'axios';

export default class CommentService {
    public static async addComment(comment: ICommentFormData): Promise<IComment> {
        const { data } = await axios.post<IComment>(
            process.env.REACT_APP_API_URL + 'comments',
            comment,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
    public static async upvoteComment(commentId: string): Promise<IComment> {
        const { data } = await axios.post<IComment>(
            process.env.REACT_APP_API_URL + `comments/${commentId}/vote/up`,
            { commentId },
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
    public static async downvoteComment(commentId: string): Promise<IComment> {
        const { data } = await axios.post<IComment>(
            process.env.REACT_APP_API_URL + `comments/${commentId}/vote/down`,
            {
                commentId,
            },
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
}
