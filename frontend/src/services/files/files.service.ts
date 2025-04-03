import { $api } from "../api";

export class FilesService {
    static async uploadFile(file: File): Promise<string> {
        const formData = new FormData(); 
        formData.append('file', file);

        const response = await $api.post<string>('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; 
    }

    static  getFileUrl(filenamePath?: string): string {
        if (!filenamePath) {
            return '/images/image-standard.png';
        }
        return "http://localhost:3000" + filenamePath;
    }
}
