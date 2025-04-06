import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest(); // get the incoming request
    const authHeader = request.headers['authorization']; // grab the authorization header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token'); // no token or wrong format
    }

    const token = authHeader.split(' ')[1]; // extract the token part
    try {
      const decoded = await this.jwtService.decodeToken(token); // decode the token
      if (!decoded) {
        throw new UnauthorizedException('Invalid token'); // token is bad
      }
      request.user = decoded; // attach user info to the request
      return true; // let the request pass
    } catch (err) {
      throw new UnauthorizedException('Invalid token'); // token decoding failed
    }
  }
}