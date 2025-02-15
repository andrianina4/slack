import { Channel, GroupMembers, Messages, User } from "../entities";
import { TypeAddChannel } from "../types";

export class ChannelService {
  async addChannel(body: TypeAddChannel, user: User) {
    const newGroup = new Channel();
    Object.assign(newGroup, body);
    await newGroup.save();

    const newGroupMembers = new GroupMembers();

    newGroupMembers.channel = newGroup;
    newGroupMembers.isOwner = true;
    newGroupMembers.user = user;

    await newGroupMembers.save();
    return newGroup;
  }

  async getMyChannel(userId: number) {
    const channels = await Channel.find({
      where: {
        groupeMembers: {
          user: {
            id: userId,
          },
        },
      },
    });

    return channels;
  }

  async getConfigChannel(channelId: number) {
    const groupsMembers = GroupMembers.find({
      where: {
        channel: {
          id: channelId,
        },
      },
      relations: {
        user: true,
      },
    });

    const messages = Messages.find({
      where: {
        recipentGroup: {
          id: channelId,
        },
      },
      relations: {
        sender: true,
        recipentUser: true,
        recipentGroup: true,
      },
      order: {
        id: "DESC",
      },
    });

    const [resMembers, resMessage] = await Promise.all([
      groupsMembers,
      messages,
    ]);

    return {
      members: resMembers,
      messages: resMessage,
    };
  }
}
