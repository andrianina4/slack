import {
  IChannel,
  IGroupeMembers,
  IMessage,
  IUser,
  TypeAddChannel,
  TypeAddMembers,
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

export const getMyConversation = async () => {
  const response = await fetch(
    `http://localhost/api/channel/getMyConversation`
  );
  return (await response.json()) as IUser[];
};

export const getMessageDirect = async (userId: number) => {
  const response = await fetch(
    `http://localhost/api/channel/getMessageDirect/${userId}`
  );
  return (await response.json()) as IMessage[];
};

export const getUserInChannel = async (channelId: number) => {
  const response = await fetch(
    `http://localhost/api/channel/getUserInChannel/${channelId}`
  );
  return (await response.json()) as IGroupeMembers[];
};

export const addMembers = async (body: TypeAddMembers) => {
  const response = await fetch(`http://localhost/api/channel/addMembers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return (await response.json()) as unknown;
};

export async function modifyChannel(channelId: number, body: TypeAddChannel) {
  const response = await fetch(
    `http://localhost/api/channel/modifyChannel/${channelId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  return (await response.json()) as IChannel;
}
