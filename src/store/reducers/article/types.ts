import { IArticle } from '@/models/article';
import { IComment } from '@/models/comment';

export interface ArticleState {
    isFetching: boolean;
    articles: IArticle[];
    article: IArticle;
    error: string;
    image: string;
    comment: IComment;
}

export enum ArticleActionTypes {
    SET_IS_FETCHING = 'SET_LOADING',
    SET_ARTICLES = 'SET_ARTICLES',
    SET_ARTICLE = 'SET_ARTICLE',
    SET_ERROR = 'SET_ERROR',
    SET_IMAGE = 'SET_IMAGE',
    SET_COMMENT = 'SET_COMMENT',
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
export interface SetCommentAction {
    type: ArticleActionTypes.SET_COMMENT;
    payload: IComment;
}

export type ArticleAction =
    | SetLoadingAction
    | SetArticlesAction
    | SetArticleAction
    | SetErrorAction
    | SetImageAction
    | SetCommentAction;
