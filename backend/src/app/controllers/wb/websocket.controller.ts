import {
  EventName,
  SocketIOController,
  WebsocketContext,
  WebsocketResponse,
} from "@foal/socket.io";
import { ServerOptions } from "socket.io";

export class WebsocketController extends SocketIOController {
  private users = new Map<string, string>(); // userId -> socketId

  options: Partial<ServerOptions> = {
    cors: {
      origin: "*",
    },
  };

  @EventName("joinPrivateChat")
  async createProduct(ctx: WebsocketContext, payload: { userId: string }) {
    this.users.set(payload.userId, ctx.socket.id);
    console.log("JOIN_CHAT", {
      userId: payload.userId,
      id: ctx.socket.id,
    });
    return new WebsocketResponse();
  }

  @EventName("sendMessage")
  async sendMessage(
    ctx: WebsocketContext,
    payload: {
      senderId: string;
      receiverId: string | string[];
      content: string;
    }
  ) {
    const sendSocket = (targetId: string) => {
      const element = targetId;
      const receiverSocketId = this.users.get(element);
      if (receiverSocketId) {
        ctx.socket.to(receiverSocketId).emit("receiveMessage", {
          senderId: payload.senderId,
          content: payload.content,
        });
      } else {
        console.error("Socket introuvable pour ID");
      }
    };

    if (!Array.isArray(payload.receiverId)) {
      sendSocket(payload.receiverId);
    } else {
      for (let i = 0; i < payload.receiverId.length; i++) {
        const element = payload.receiverId[i];
        sendSocket(element);
      }
    }

    return new WebsocketResponse();
  }

  onConnection(ctx: WebsocketContext): void | Promise<void> {
    console.log("Connexion", {
      config: {
        socket: ctx.socket.id,
      },
    });
  }
}
