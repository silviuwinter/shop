// this module sets up the files feature in the app
import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';

@Module({
  providers: [FilesService], // makes the service available for dependency injection
  controllers: [FilesController] // handles incoming requests for file-related stuff
})
export class FilesModule {}
