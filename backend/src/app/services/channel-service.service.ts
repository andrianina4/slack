import { Channel, GroupMembers, Messages, User } from "../entities";
import { TypeAddChannel, TypePostMessageChannel } from "../types";

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
    const channel = Channel.findOne({
      where: {
        id: channelId,
      },
    });

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

    const [resMembers, resChannel] = await Promise.all([
      groupsMembers,
      // messages,
      channel,
    ]);

    return {
      members: resMembers,
      // messages: resMessage,
      channel: resChannel,
    };
  }

  async getMessageChannel(channelId: number) {
    const messages = await Messages.find({
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
    });

    return messages;
  }

  async postMessageChannel(body: TypePostMessageChannel) {
    const { content, recipentChannelId, sender } = body;

    const channel = await Channel.findOne({
      where: {
        id: recipentChannelId,
      },
    });

    const newMessage = new Messages();
    newMessage.content = content;
    newMessage.sender = sender;
    if (channel) {
      newMessage.recipentGroup = channel;
    }

    await newMessage.save();

    return newMessage;
  }
}
