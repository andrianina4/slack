import { IChannel, IGroupeMembers, IUser } from "../entity";

export interface IResponseCheckSessions {
  status: number;
  user?: IUser;
}

export interface IResponseGetConfigChannel {
  members: IGroupeMembers[];
  // messages: IMessage[];
  channel: IChannel;
}
