import { IArticle, IArticleFormData } from '@/models/article';
import { IComment } from '@/models/comment';
import { ArticleService } from '@/services';
import ImageService from '@/services/imageService';
import { AppDispatch } from '@/store';
import {
    ArticleActionTypes,
    SetArticleAction,
    SetArticlesAction,
    SetCommentAction,
    SetErrorAction,
    SetImageAction,
    SetLoadingAction,
    SetTotalAction,
} from './types';

export const ArticleActionCreator = {
    setArticles: (articles: IArticle[]): SetArticlesAction => ({
        type: ArticleActionTypes.SET_ARTICLES,
        payload: articles,
    }),
    setArticle: (article: IArticle): SetArticleAction => ({
        type: ArticleActionTypes.SET_ARTICLE,
        payload: article,
    }),
    setImage: (image: string): SetImageAction => ({
        type: ArticleActionTypes.SET_IMAGE,
        payload: image,
    }),
    setComment: (comment: IComment): SetCommentAction => ({
        type: ArticleActionTypes.SET_COMMENT,
        payload: comment,
    }),
    setIsFetching: (payload: boolean): SetLoadingAction => ({
        type: ArticleActionTypes.SET_IS_FETCHING,
        payload,
    }),
    setArticleError: (error: string): SetErrorAction => ({
        type: ArticleActionTypes.SET_ERROR,
        payload: error,
    }),
    setTotal: (payload: number): SetTotalAction => ({
        type: ArticleActionTypes.SET_TOTAL,
        payload,
    }),
    removeArticle: (articleId: string) => async (dispatch: AppDispatch) => {
        try {
            await ArticleService.removeArticle(articleId);
            const { items } = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(items));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while deleting the article...')
            );
        }
    },
    getArticles: (limit = 0, offset = 0) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ArticleActionCreator.setIsFetching(true));

            const { items, pagination } = await ArticleService.getArticles(limit, offset);
            dispatch(ArticleActionCreator.setArticles(items));
            dispatch(ArticleActionCreator.setTotal(pagination.total));

            dispatch(ArticleActionCreator.setIsFetching(false));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while fetching the articles...')
            );
        }
    },
    getArticleByID: (id: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(ArticleActionCreator.setIsFetching(true));

            const article = await ArticleService.getArticleByID(id);
            dispatch(ArticleActionCreator.setArticle(article));
            const img = await ImageService.getImageByID(article.imageId);
            dispatch(ArticleActionCreator.setImage(img));
            const { items } = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(items));

            dispatch(ArticleActionCreator.setIsFetching(false));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while fetching an article...')
            );
        }
    },
    publish: (article: IArticleFormData) => async (dispatch: AppDispatch) => {
        try {
            const img = await ImageService.uploadImg(article.image);
            article.imageId = img[0].imageId;

            ArticleService.createArticle(article);

            const { items } = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(items));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while publishing the article...')
            );
        }
    },
    update: (article: IArticleFormData) => async (dispatch: AppDispatch) => {
        try {
            console.log(article);

            if (article.image.has('image')) {
                const img = await ImageService.uploadImg(article.image);
                article.imageId = img[0].imageId;
                console.log(article);
            }

            ArticleService.updateArticle(article);

            const { items } = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(items));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while updating the article...')
            );
        }
    },
    getImage: (imgId: string) => async (dispatch: AppDispatch) => {
        try {
            const img = await ImageService.getImageByID(imgId);
            dispatch(ArticleActionCreator.setImage(img));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while fetching the image...')
            );
        }
    },
};
