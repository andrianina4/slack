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

export type TypeModifyUser = Pick<IUser, "firstname" | "lastname" | "id">;

export type TypeAddChannel = Pick<IChannel, "name" | "isPublic">;
