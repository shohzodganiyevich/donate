import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("AuthHeader topilmadi");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new UnauthorizedException("Token topilmadi");
    }

    let decodedToken: any;
    // console.log(process.env.SECRET_KEY, process.env.SECRET_TIME, token);

    try {
      decodedToken = this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException({
        message: "Foydalanuvchi avtorizatsiyadan o'tmagan",
        error,
      });
    }

    request.user = decodedToken;
    // console.log(request);
    return true;
  }
}
