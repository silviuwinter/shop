// this controller handles file upload requests
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';

@Controller('files') // sets the route prefix for all endpoints in this controller
export class FilesController {
    constructor(private readonly filesService: FilesService) {} // injects the file service

    @Post('upload') // endpoint for uploading files
    @UseInterceptors(FileInterceptor('file')) // handles file upload from the request
    async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string> {
        // calls the service to save the file and returns the file's url
        return await this.filesService.uploadFile(file);
    }
}
