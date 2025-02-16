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
}

export type TypeModifyUser = Pick<IUser, "firstname" | "lastname" | "id">;

export type TypeAddChannel = Pick<IChannel, "name" | "isPublic">;

export type TypePostMessageChannel = {
  recipentChannelId: number;
  content: string;
};
