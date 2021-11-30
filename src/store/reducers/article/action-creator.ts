import { IArticle, IArticleFormData } from '@/models/article';
import { ArticleService } from '@/services';
import ImageService from '@/services/imageService';
import { AppDispatch } from '@/store';
import {
    ArticleActionTypes,
    SetArticleAction,
    SetArticlesAction,
    SetErrorAction,
    SetImageAction,
    SetLoadingAction,
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
    setIsFetching: (payload: boolean): SetLoadingAction => ({
        type: ArticleActionTypes.SET_IS_FETCHING,
        payload,
    }),
    setArticleError: (error: string): SetErrorAction => ({
        type: ArticleActionTypes.SET_ERROR,
        payload: error,
    }),
    removeArticle: (articleId: string) => async (dispatch: AppDispatch) => {
        try {
            await ArticleService.removeArticle(articleId);
            const articles = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(articles));
        } catch (error) {
            dispatch(
                ArticleActionCreator.setArticleError('Failed while deleting the article...')
            );
        }
    },
    getArticles: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(ArticleActionCreator.setIsFetching(true));

            const articles = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(articles));

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

            const articles = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(articles));
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

            const articles = await ArticleService.getArticles();
            dispatch(ArticleActionCreator.setArticles(articles));
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
