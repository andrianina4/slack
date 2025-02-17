import {
  Context,
  dependency,
  Get,
  hashPassword,
  HttpResponseNoContent,
  HttpResponseOK,
  HttpResponseRedirect,
  HttpResponseUnauthorized,
  Post,
  UserRequired,
  UseSessions,
  verifyPassword,
} from "@foal/core";
import { GoogleProvider, GoogleUserInfo } from "@foal/social";
import { User } from "../../entities";
import { WsServer } from "@foal/socket.io";

export class AuthController {
  @dependency
  wsServer: WsServer;

  @dependency
  google: GoogleProvider;

  @Post("/login")
  async login(ctx: Context<User>) {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return new HttpResponseUnauthorized({ type: "email", status: 400 });
    }

    try {
      if (!(await verifyPassword(password, user.password))) {
        return new HttpResponseUnauthorized({ type: "password", status: 400 });
      }
    } catch (error) {
      return new HttpResponseUnauthorized({ type: "password", status: 400 });
    }

    ctx.session!.setUser(user);
    await ctx.session!.regenerateID();

    return new HttpResponseOK(user);
  }

  @Get("/check-session")
  async checkSession(ctx: Context<User>) {
    if (!ctx.session) {
      return new HttpResponseUnauthorized({ status: 400, user: undefined });
    }
    return new HttpResponseOK({
      status: 200,
      user: ctx.user,
    });
  }

  @Post("/logout")
  @UseSessions()
  @UserRequired()
  async logout(ctx: Context<User>) {
    const user = ctx.user;
    await ctx.session!.destroy();
    this.wsServer.io.emit("userStatus", {
      userId: user.id,
      status: 0,
    });
    return new HttpResponseNoContent();
  }

  @Get("/google")
  redirectToGoogle() {
    return this.google.redirect();
  }

  @Get("/google/callback")
  async handleGoogleRedirection(ctx: Context<User>) {
    const { userInfo } = await this.google.getUserInfo<GoogleUserInfo>(ctx);
    if (!userInfo.email) {
      return new HttpResponseRedirect("/login?google=700");
    }

    let user = await User.findOne({
      where: {
        email: userInfo.email,
      },
    });

    if (!user) {
      user = new User();
      user.email = userInfo.email;
      user.password = await hashPassword("Novity2025");
      user.firstname = userInfo.given_name || "";
      user.lastname = userInfo.family_name || "";
      await user.save();
    }

    ctx.session!.setUser(user);

    return new HttpResponseRedirect(`/`);
  }
}
