import {
  IChannel,
  IMessage,
  TypeAddChannel,
  TypePostMessageChannel,
} from "@/interfaces/entity";
import { IResponseGetConfigChannel } from "@/interfaces/responses";

export async function addChannel(body: TypeAddChannel) {
  const response = await fetch("http://localhost/api/channel/addChannel", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return (await response.json()) as IChannel;
}

export const getMyChannel = async () => {
  const response = await fetch("http://localhost/api/channel/getMyChannel");
  return (await response.json()) as IChannel[];
};

export const getConfigChannel = async (channelId: number) => {
  const response = await fetch(
    `http://localhost/api/channel/getConfigChannel/${channelId}`
  );
  return (await response.json()) as IResponseGetConfigChannel;
};

export const getMessageChannel = async (channelId: number) => {
  const response = await fetch(
    `http://localhost/api/channel/getMessageChannel/${channelId}`
  );
  return (await response.json()) as IMessage[];
};

export const postMessageChannel = async (body: TypePostMessageChannel) => {
  const response = await fetch(
    `http://localhost/api/channel/postMessageChannel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  return (await response.json()) as IMessage;
};
