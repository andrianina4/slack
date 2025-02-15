import {
  Context,
  dependency,
  Get,
  HttpResponseOK,
  Post,
  UserRequired,
} from "@foal/core";
import { ChannelService } from "../../services";
import { User } from "../../entities";

export class ChannelController {
  @dependency
  channelService: ChannelService;

  @Post("/addChannel")
  @UserRequired()
  async addChannel(ctx: Context<User>) {
    const body = ctx.request.body;
    const results = await this.channelService.addChannel(body);
    return new HttpResponseOK(results);
  }
}
