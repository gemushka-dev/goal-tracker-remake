import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";
import { config } from "dotenv";
import { JwtService } from "@nestjs/jwt";

config();

@Injectable()
export class ParamsGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest() as Request;
    const token = req.cookies["jwt_token"];
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET,
      });

      req["user"] = payload;
      if (req.body) {
        req.body.userId = payload.id;
        if (req.params.id) req.body.goalId = Number(req.params.id);
        if (req.params.parent) req.body.parentId = Number(req.params.parent);
        if (req.params.comment) req.body.commentId = Number(req.params.comment);
      }
    } catch (e) {}
    return true;
  }
}
