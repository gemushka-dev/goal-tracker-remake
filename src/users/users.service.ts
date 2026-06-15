import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserDTO, UserLoginDTO } from "../common/dto/user.dto";
import { dbService } from "../db/db.service";
import { compare, hash } from "bcrypt";
import type { Response } from "express";

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  async getUserById(userId: number) {
    const user = await dbService.getUserById(userId);
    if (!user?.userId) throw new NotFoundException();
    return user;
  }

  async register(user: UserDTO) {
    const existUser = await dbService.getUserByEmail(user.email);
    if (existUser?.userId) throw new ConflictException();
    const hashedPassword = await hash(user.password, 10);
    const created = await dbService.createUser({
      ...user,
      password: hashedPassword,
    });
    if (created instanceof Error) {
      throw new ConflictException("Database error: " + created.message);
    }
    if (Array.isArray(created) && created.length > 0) {
      const { password, ...safeUser } = created[0];
      return safeUser;
    }
    throw new ConflictException("Failed to create user");
  }

  async login(user: UserLoginDTO, res: Response) {
    const existUser = await dbService.getUserByEmail(user.email);
    if (!existUser?.userId) throw new UnauthorizedException();
    const isSame = await compare(user.password, existUser.password);
    if (!isSame) throw new UnauthorizedException();
    const token = this.jwtService.sign({
      id: existUser.userId,
      email: existUser.email,
    });
    res.cookie("jwt_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged in" });
  }

  async deleteUser(userId: number) {
    return await dbService.deleteUser(userId);
  }
}
