import { IArticle, IArticleFormData, IArticleResponse } from '@/models/article';
import { authHeader } from '@/utils/auth';
import axios from 'axios';

export class ArticleService {
    public static async getArticles(limit?: number, offset = 0): Promise<IArticleResponse> {
        const { data } = await axios.get<IArticleResponse>(
            process.env.REACT_APP_API_URL + 'articles',
            {
                params: {
                    limit: limit || undefined,
                    offset,
                },
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
    public static async getArticleByID(articleId: string): Promise<IArticle> {
        const { data } = await axios.get(
            process.env.REACT_APP_API_URL + `articles/${articleId}`,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
    public static async createArticle(article: IArticleFormData): Promise<IArticle> {
        const { data } = await axios.post<IArticle>(
            process.env.REACT_APP_API_URL + 'articles',
            article,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
    public static async updateArticle(article: IArticleFormData): Promise<IArticle> {
        const { data } = await axios.patch<IArticle>(
            process.env.REACT_APP_API_URL + `articles/${article.articleId}`,
            article,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
    public static async removeArticle(articleId: string): Promise<void> {
        await axios.delete(process.env.REACT_APP_API_URL + `articles/${articleId}`, {
            headers: authHeader(process.env.REACT_APP_API_KEY || ''),
        });
    }
}
