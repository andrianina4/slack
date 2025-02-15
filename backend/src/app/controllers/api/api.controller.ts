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
  ];
}
