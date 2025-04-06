// this service handles file uploads and saves them to a specific directory
import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
    // uploads a file to the server and returns its public url
    async uploadFile(file: Express.Multer.File, directory: string = 'uploads'): Promise<string> {
        // make sure the upload folder exists, if not, create it
        const uploadDir = `./public/${directory}`;
        if (!existsSync(uploadDir)) { // check if folder exists
          mkdirSync(uploadDir, { recursive: true }); // create folder if missing
        }
    
        // create a unique name for the file using uuid
        const fileName = `${uuid()}${extname(file.originalname)}`; // keep original file extension
        
        // save the file to the upload folder
        const filePath = `${uploadDir}/${fileName}`;
        const writeFile = require('fs').promises.writeFile; // use promises to write file
        await writeFile(filePath, file.buffer); // save file content
        
        // return the url where the file can be accessed
        return `/${directory}/${fileName}`;
    }
}
