import {
  Context,
  dependency,
  Get,
  HttpResponseNotFound,
  HttpResponseOK,
  Post,
  UserRequired,
} from "@foal/core";
import { User } from "../../entities";
import { UserService } from "../../services";

export class UserController {
  @dependency
  userService: UserService;

  @Post("/modifyUser")
  @UserRequired()
  async modifyUser(ctx: Context<User>) {
    const body = ctx.request.body;

    const results = await this.userService.modifyUser(body);

    if (results) return new HttpResponseOK(results);
    else return new HttpResponseNotFound("user not found in db");
  }

  @Get("/getAllUser")
  @UserRequired()
  async getAllUser(ctx: Context<User>) {
    const user = ctx.user;
    return new HttpResponseOK(await this.userService.getAllUser(user));
  }
}
