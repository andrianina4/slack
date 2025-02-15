import {
  Class,
  Context,
  controller,
  Get,
  HttpResponseOK,
  IController,
} from "@foal/core";
import { AuthController } from "./auth.controller";

export class ApiController implements IController {
  subControllers?: Class<IController>[] | undefined = [
    controller("/auth", AuthController),
  ];

  // @Get("/")
  // index(ctx: Context) {
  //   return new HttpResponseOK("Testing end point /api");
  // }
}
