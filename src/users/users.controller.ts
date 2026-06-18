import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { UserDTO, UserLoginDTO } from "../common/dto/user.dto";
import type { Response } from "express";
import { ApiCookieAuth, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import type { AuthRequest } from "../common/types/authrequest.type";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiParam({
    name: "id",
    type: Number,
    description: "UserId to get user info",
  })
  @Get("/:id")
  async getUserById(@Param("id", ParseIntPipe) id: number) {
    return await this.usersService.getUserById(id);
  }

  @Post("register")
  async register(@Body() user: UserDTO) {
    return await this.usersService.register(user);
  }
  @Post("login")
  async login(@Body() user: UserLoginDTO, @Res() res: Response) {
    return await this.usersService.login(user, res);
  }

  @ApiCookieAuth("jwt_token")
  @UseGuards(AuthGuard)
  @Delete("delete")
  async deleteUser(@Req() req: AuthRequest) {
    return await this.usersService.deleteUser(req.user.id);
  }
}
