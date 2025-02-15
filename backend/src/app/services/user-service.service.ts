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
}
