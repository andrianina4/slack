import { Channel, User } from "../entities";

export type TypeModifyUser = Pick<User, "firstname" | "lastname" | "id">;
export type TypeAddChannel = Pick<Channel, "name" | "isPublic">;
export type TypePostMessageChannel = {
  recipentChannelId: number;
  sender: User;
  content: string;
};
