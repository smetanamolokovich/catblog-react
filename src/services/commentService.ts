import { IComment, ICommentFormData } from '@/models/comment';
import { authHeader } from '@/utils/auth';
import axios from 'axios';

export default class CommentService {
    public static async createComment(comment: ICommentFormData): Promise<IComment> {
        const { data } = await axios.post<IComment>(
            process.env.REACT_APP_API_URL + 'comments',
            comment,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
}
