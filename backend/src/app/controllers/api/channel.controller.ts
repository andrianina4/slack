import {
  Context,
  dependency,
  Get,
  HttpResponseOK,
  Post,
  UserRequired,
  ValidatePathParam,
} from "@foal/core";
import { ChannelService } from "../../services";
import { User } from "../../entities";
import { TypePostMessageChannel } from "../../types";

export class ChannelController {
  @dependency
  channelService: ChannelService;

  @Post("/addChannel")
  @UserRequired()
  async addChannel(ctx: Context<User>) {
    const body = ctx.request.body;
    const results = await this.channelService.addChannel(body, ctx.user);
    return new HttpResponseOK(results);
  }

  @Get("/getMyChannel")
  @UserRequired()
  async getMyChannel(ctx: Context<User>) {
    return new HttpResponseOK(
      await this.channelService.getMyChannel(ctx.user.id)
    );
  }

  @Get("/getConfigChannel/:channelId")
  @UserRequired()
  @ValidatePathParam("channelId", { type: "number" })
  async getConfigChannel(ctx: Context<User>) {
    const channelId = ctx.request.params.channelId;
    return new HttpResponseOK(
      await this.channelService.getConfigChannel(channelId)
    );
  }

  @Get("/getMessageChannel/:channelId")
  @UserRequired()
  @ValidatePathParam("channelId", { type: "number" })
  async getMessageChannel(ctx: Context<User>) {
    const channelId = ctx.request.params.channelId;
    return new HttpResponseOK(
      await this.channelService.getMessageChannel(channelId)
    );
  }

  @Post("/postMessageChannel")
  @UserRequired()
  async postMessageChannel(ctx: Context<User>) {
    const userConnected = ctx.user;
    const body = ctx.request.body;

    const data: TypePostMessageChannel = {
      content: body.content,
      recipentChannelId: body.recipentChannelId,
      sender: userConnected,
    };

    return new HttpResponseOK(
      await this.channelService.postMessageChannel(data)
    );
  }
}
