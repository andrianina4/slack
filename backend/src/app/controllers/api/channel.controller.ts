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
import { Messages, User } from "../../entities";
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

  @Get("/getMessageDirect/:userId")
  @UserRequired()
  @ValidatePathParam("userId", { type: "number" })
  async getMessageDirect(ctx: Context<User>) {
    const userConnected = ctx.user;
    const userId = ctx.request.params.userId;
    return new HttpResponseOK(
      await this.channelService.getMessageDirect(userConnected.id, userId)
    );
  }

  @Post("/postMessageChannel")
  @UserRequired()
  async postMessageChannel(ctx: Context<User>) {
    const userConnected = ctx.user;
    const body = ctx.request.body;

    const data: TypePostMessageChannel = {
      content: body.content,
      recipentChannelId: body?.recipentChannelId,
      recipentUserlId: body?.recipentUserId,
      sender: userConnected,
    };

    return new HttpResponseOK(
      await this.channelService.postMessageChannel(data)
    );
  }

  @Get("/getMyConversation")
  @UserRequired()
  async getMyConversation(ctx: Context<User>) {
    const users = await this.channelService.getMyConversation(ctx.user.id);
    return new HttpResponseOK(users);
  }

  @Get("/getUserInChannel/:userId")
  @UserRequired()
  @ValidatePathParam("userId", { type: "number" })
  async getUserInChannel(ctx: Context<User>) {
    const userId = ctx.request.params.userId;
    const results = await this.channelService.getUserInChannel(userId);
    return new HttpResponseOK(results);
  }

  @Post("/addMembers")
  @UserRequired()
  async addMembers(ctx: Context<User>) {
    const userConnected = ctx.user;
    const body = ctx.request.body;

    return new HttpResponseOK(
      await this.channelService.addMembers(body.userIds, body.channelId)
    );
  }
}
