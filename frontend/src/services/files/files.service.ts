import { $api } from "../api";

export class FilesService {
    // uploads a file to the server and returns the file url
    static async uploadFile(file: File): Promise<string> {
        const formData = new FormData(); 
        formData.append('file', file); // adds the file to the form data

        const response = await $api.post<string>('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // tells the server we're sending a file
            },
        });

        return response.data; // returns the url of the uploaded file
    }

    // gets the full url of a file or a default image if no file is provided
    static getFileUrl(filenamePath?: string): string {
        if (!filenamePath) {
            return '/images/image-standard.png'; // default image if no file path
        }
        return "http://localhost:3000" + filenamePath; // combines base url with file path
    }
}
