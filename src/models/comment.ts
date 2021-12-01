export interface IComment {
    commentId: string;
    articleId: string;
    author: string;
    content: string;
    score: number;
}

export interface ICommentFormData {
    articleId: string;
    author: string;
    content: string;
}
