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
} from "@foal/core";
import { GoogleProvider, GoogleUserInfo } from "@foal/social";
import { User } from "../../entities";

export class AuthController {
  @dependency
  google: GoogleProvider;

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
  async logout(ctx: Context) {
    await ctx.session!.destroy();
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
      user.password = "password_auth";
      user.firstname = userInfo.given_name || "";
      user.lastname = userInfo.family_name || "";
      await user.save();
    }

    ctx.session!.setUser(user);

    return new HttpResponseRedirect(`/`);
  }
}
