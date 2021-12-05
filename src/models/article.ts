import { IComment } from './comment';

export interface IArticleFormData {
    articleId: string;
    title: string;
    perex: string;
    imageId: string;
    content: string;
    image: FormData;
}

export interface IArticleResponse {
    items: IArticle[];
    pagination: IPagination;
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

export interface IPagination {
    total: number;
    limit: number;
    offset: number;
}

export interface IImageFormData {
    imageId: string;
    name: string;
}
