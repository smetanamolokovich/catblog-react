export interface IComment {
    commentId: string;
    articleId: string;
    author: string;
    content: string;
    score: number;
    createdAt: string;
}

export interface ICommentFormData {
    articleId: string;
    author: string;
    content: string;
}
