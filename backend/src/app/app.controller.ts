import { controller, IAppController } from "@foal/core";
import { ApiController } from "./controllers/api/api.controller";

export class AppController {
  subControllers = [controller("/api", ApiController)];
}
