import { IChannel, TypeAddChannel } from "@/interfaces/entity";

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
