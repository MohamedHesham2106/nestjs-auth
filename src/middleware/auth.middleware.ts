import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../modules/auth/auth.service';
import { TJwtPayload } from 'src/types/jwt.types';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(
    req: Request & { user?: TJwtPayload },
    res: Response,
    next: NextFunction,
  ): void {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const payload = this.authService.verifyToken(token);
      req.user = payload;
      next();
    } catch (err) {
      console.error('Token verification failed:', err.message);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
