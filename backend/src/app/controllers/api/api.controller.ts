import {
  Class,
  Context,
  controller,
  Get,
  HttpResponseOK,
  IController,
  UseSessions,
} from "@foal/core";
import { AuthController } from "./auth.controller";
import { User } from "../../entities";
import { UserController } from "./user.controller";
import { ChannelController } from "./channel.controller";
@UseSessions({
  cookie: true,
  user: (id: number) =>
    User.findOneWithPermissionsBy({
      id,
    }),
})
export class ApiController implements IController {
  subControllers?: Class<IController>[] | undefined = [
    controller("/auth", AuthController),
    controller("/user", UserController),
    controller("/channel", ChannelController),
  ];
}
