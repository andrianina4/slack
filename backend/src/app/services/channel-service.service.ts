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

  async getMessageDirect(myId: number, userId: number) {
    const messages = await Messages.createQueryBuilder("message")
      .leftJoinAndSelect("message.sender", "sender") // Jointure avec l'expéditeur
      .leftJoinAndSelect("message.recipentUser", "recipient") // Jointure avec le destinataire
      .where(
        "(message.sender.id = :userId1 AND message.recipentUser.id = :userId2) OR (message.sender.id = :userId2 AND message.recipentUser.id = :userId1)",
        { userId1: myId, userId2: userId }
      )
      .andWhere("message.recipentGroup IS NULL") // Exclure les messages envoyés à un groupe
      .getMany();
    // const messages = await Messages.find({
    //   where: {
    //     recipentUser: {
    //       id: userId,
    //     },
    //     sender: {
    //       id: myId,
    //     },
    //   },
    //   relations: {
    //     sender: true,
    //     recipentUser: true,
    //     recipentGroup: true,
    //   },
    // });

    return messages.sort((a, b) => a.id - b.id);
  }

  async postMessageChannel(body: TypePostMessageChannel) {
    const { content, recipentChannelId, recipentUserlId, sender } = body;

    const newMessage = new Messages();
    newMessage.content = content;
    newMessage.sender = sender;

    if (recipentChannelId) {
      const channel = await Channel.findOne({
        where: {
          id: recipentChannelId,
        },
      });

      if (channel) {
        newMessage.recipentGroup = channel;
      }
    } else if (recipentUserlId) {
      const user = await User.findOne({
        where: {
          id: recipentUserlId,
        },
      });
      if (user) {
        newMessage.recipentUser = user;
      }
    }

    await newMessage.save();

    return newMessage;
  }

  async getMyConversation(userId: number) {
    type ResponseQuery = {
      sender_id: number;
      sender_email: string;
      sender_password: string;
      sender_lastname: string;
      sender_firstname: string;
      id: number;
      lastname: string;
      firstname: string;
      email: string;
      password: string;
    };

    const users = (await Messages.createQueryBuilder("message")
      .leftJoinAndSelect("message.sender", "sender")
      .leftJoinAndSelect("message.recipentUser", "recipient")
      .leftJoinAndSelect("message.recipentGroup", "channel")
      .where(
        "(message.sender.id = :userId OR message.recipentUser.id = :userId) AND channel.id IS NULL",
        { userId }
      )
      .select([
        "sender.id",
        "sender.lastname",
        "sender.firstname",
        "sender.email",
        "sender.password",

        "recipient.id as id",
        "recipient.lastname as lastname",
        "recipient.firstname as firstname",
        "recipient.email as email",
        "recipient.password as password",
      ])
      .getRawMany()) as ResponseQuery[];

    const filtre = users.map((item) => {
      const datas = {
        id: 0,
        lastname: "",
        firstname: "",
        email: "",
        password: "",
      };

      if (item.id === Number(userId)) {
        // C'est à dire que celui qui regarde maintenant est le recepteur
        datas.id = item.sender_id;
        datas.email = item.sender_email;
        datas.firstname = item.sender_firstname;
        datas.lastname = item.sender_lastname;
        datas.password = item.sender_password;
      } else {
        datas.id = item.id;
        datas.email = item.email;
        datas.firstname = item.firstname;
        datas.lastname = item.lastname;
        datas.password = item.password;
      }
      return datas;
    });

    const uniqueArray = Array.from(
      new Map(filtre.map((item) => [item.id, item])).values()
    );

    return uniqueArray;
  }

  async getUserInChannel(channelId: number) {
    const members = await GroupMembers.find({
      where: {
        channel: {
          id: channelId,
        },
      },
      relations: {
        user: true,
      },
    });

    return members;
  }
}
