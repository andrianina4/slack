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
  async checkSession(ctx: Context) {
    console.log("Check Session");

    if (!ctx.session) {
      return new HttpResponseUnauthorized({ message: "No active session" });
    }
    return new HttpResponseOK({
      message: "Session active",
      user: ctx.session.get("userId"),
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
      // throw new Error('Google should have returned an email address.');
      return new HttpResponseRedirect("/login?google=700");
    }

    const user = await User.findOne({
      where: {
        email: userInfo.email,
      },
    });

    const hashed = await hashPassword(Math.random().toString());

    if (!user) {
      return new HttpResponseRedirect(
        `/login?google=${hashed}&email=${userInfo.email}&user=${JSON.stringify(
          user
        )}`
      );
    } else {
      //   const userEncryptData = encryptData(user);

      ctx.session!.setUser(user);
      ctx.user = user;

      //   return new HttpResponseRedirect(`/?userInfo=${userEncryptData}`);
      return new HttpResponseRedirect(`/`);
    }
  }
}
