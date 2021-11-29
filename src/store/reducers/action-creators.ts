import { AuthActionCreators } from './auth/action-creator';
import { ArticleActionCreator } from './article/action-creator';

export const allActionCreators = {
    ...AuthActionCreators,
    ...ArticleActionCreator,
};
