export interface IUser {
  id: number;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
}

export interface IChannel {
  id: number;
  name: string;
  isPublic: boolean;
  groupeMembers: IGroupeMembers[];
}

export interface IGroupeMembers {
  id: number;
  channel: IChannel;
  isOwner: boolean;
  user: IUser;
}

export interface IMessage {
  content: string;
  sender: IUser | null;
  recipentUser: IUser | null;
  recipentGroup: IChannel | null;
  timestamp: string;
}

export type TypeModifyUser = Pick<IUser, "firstname" | "lastname" | "id">;

export type TypeAddChannel = Pick<IChannel, "name" | "isPublic">;

export type TypePostMessageChannel = {
  recipentChannelId?: number;
  recipentUserId?: number;
  content: string;
};

export type TypeAddMembers = {
  userIds: number[];
  channelId: number;
};
