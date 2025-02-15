import { SocketIOController, WebsocketContext } from "@foal/socket.io";
import { ServerOptions } from "socket.io";

export class WebsocketController extends SocketIOController {
  options: Partial<ServerOptions> = {
    cors: {
      origin: "*",
    },
  };

  onConnection(ctx: WebsocketContext): void | Promise<void> {
    console.log("Tentative de connextion socket", {
      config: {
        socket: ctx.socket.id,
      },
    });
  }
}
