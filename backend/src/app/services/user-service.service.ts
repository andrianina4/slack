import { Not } from "typeorm";
import { User } from "../entities";
import { TypeModifyUser } from "../types";

export class UserService {
  async modifyUser(body: TypeModifyUser) {
    const user = await User.findOneBy({
      id: body.id,
    });

    if (user) {
      Object.assign(user, body);
      await user.save();
    }

    return user;
  }

  async getAllUser(getAllExecpt?: User) {
    if (getAllExecpt) {
      return await User.find({
        where: {
          id: Not(getAllExecpt.id),
        },
      });
    }
    return await User.find();
  }

  async getUserById(userId: number) {
    return await User.findOne({
      where: {
        id: userId,
      },
    });
  }
}
