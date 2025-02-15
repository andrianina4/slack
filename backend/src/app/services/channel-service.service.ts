import { Channel } from "../entities";
import { TypeAddChannel } from "../types";

export class ChannelService {
  async addChannel(body: TypeAddChannel) {
    const newGroup = new Channel();
    Object.assign(newGroup, body);
    await newGroup.save();
    return newGroup;
  }
}
