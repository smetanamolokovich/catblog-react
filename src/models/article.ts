import { IComment } from './comment';

export interface IArticleFormData {
    articleId: string;
    title: string;
    perex: string;
    imageId: string;
    content: string;
    image: FormData;
}

export interface IArticle {
    articleId: string;
    title: string;
    perex: string;
    imageId: string;
    content: string;
    comments: IComment[];
    createdAt: string;
}

export interface IImageFormData {
    imageId: string;
    name: string;
}
