import { IArticle, IImageFormData } from '@/models/article';

export interface ArticleState {
    isFetching: boolean;
    articles: IArticle[];
    article: IArticle;
    error: string;
    image: string;
}

export enum ArticleActionTypes {
    SET_IS_FETCHING = 'SET_LOADING',
    SET_ARTICLES = 'SET_ARTICLES',
    SET_ARTICLE = 'SET_ARTICLE',
    SET_ERROR = 'SET_ERROR',
    SET_IMAGE = 'SET_IMAGE',
}

export interface SetLoadingAction {
    type: ArticleActionTypes.SET_IS_FETCHING;
    payload: boolean;
}
export interface SetArticlesAction {
    type: ArticleActionTypes.SET_ARTICLES;
    payload: IArticle[];
}
export interface SetArticleAction {
    type: ArticleActionTypes.SET_ARTICLE;
    payload: IArticle;
}
export interface SetErrorAction {
    type: ArticleActionTypes.SET_ERROR;
    payload: string;
}
export interface SetImageAction {
    type: ArticleActionTypes.SET_IMAGE;
    payload: string;
}

export type ArticleAction =
    | SetLoadingAction
    | SetArticlesAction
    | SetArticleAction
    | SetErrorAction
    | SetImageAction;
