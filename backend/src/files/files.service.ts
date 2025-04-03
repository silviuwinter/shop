import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
    async uploadFile(file: Express.Multer.File, directory: string = 'uploads'): Promise<string> {
        // Ensure the upload directory exists
        const uploadDir = `./public/${directory}`;
        if (!existsSync(uploadDir)) {
          mkdirSync(uploadDir, { recursive: true });
        }
    
        // Generate unique filename
        const fileName = `${uuid()}${extname(file.originalname)}`;
        
        // Save file
        const filePath = `${uploadDir}/${fileName}`;
        const writeFile = require('fs').promises.writeFile;
        await writeFile(filePath, file.buffer);
        
        // Return the public URL
        return `/${directory}/${fileName}`;
      }
}
