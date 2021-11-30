import { IArticle } from '@/models/article';
import { ArticleAction, ArticleActionTypes, ArticleState } from './types';

const initialState: ArticleState = {
    articles: [] as IArticle[],
    article: {} as IArticle,
    error: '',
    isFetching: false,
    image: '',
};

export default function articleReducer(
    state = initialState,
    action: ArticleAction
): ArticleState {
    switch (action.type) {
        case ArticleActionTypes.SET_ARTICLES:
            return { ...state, articles: action.payload };
        case ArticleActionTypes.SET_ARTICLE:
            return { ...state, article: action.payload };
        case ArticleActionTypes.SET_IMAGE:
            return { ...state, image: action.payload };
        case ArticleActionTypes.SET_ERROR:
            return { ...state, error: action.payload, isFetching: false };
        case ArticleActionTypes.SET_IS_FETCHING:
            return { ...state, isFetching: action.payload };
        default:
            return state;
    }
}
