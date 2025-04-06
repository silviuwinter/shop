// this module sets up the jwt service so it can be used in other parts of the app
import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({
  providers: [JwtService], // makes jwt service available in this module
  exports: [JwtService], // lets other modules use jwt service
})
export class JwtModule {}
