import { Channel, User } from "../entities";

export type TypeModifyUser = Pick<
  User,
  "firstname" | "lastname" | "id" | "password"
>;
export type TypeAddChannel = Pick<Channel, "name" | "isPublic">;
export type TypePostMessageChannel = {
  recipentChannelId?: number;
  recipentUserlId?: number;
  sender: User;
  content: string;
};
