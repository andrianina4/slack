import {
  Context,
  Get,
  HttpResponseNoContent,
  HttpResponseOK,
  Options,
} from "@foal/core";

export class ApiController {
  @Get("/")
  index(ctx: Context) {
    return new HttpResponseOK("Hello world!");
  }
}
