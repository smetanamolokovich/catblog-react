import { IImageFormData } from '@/models/article';
import { authHeader } from '@/utils/auth';
import axios from 'axios';

export default class ImageService {
    public static async getImageByID(id: string): Promise<string> {
        const { data } = await axios.get<Blob | MediaSource>(
            process.env.REACT_APP_API_URL + `images/${id}`,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || '', true),
                responseType: 'blob',
            }
        );

        return URL.createObjectURL(data);
    }
    public static async uploadImg(image: FormData): Promise<IImageFormData[]> {
        const { data } = await axios.post<IImageFormData[]>(
            process.env.REACT_APP_API_URL + 'images',
            image,
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || '', true),
            }
        );

        return data;
    }
}
