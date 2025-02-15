import { IUser } from "../entity";

export interface IResponseCheckSessions {
  status: number;
  user?: IUser;
}
