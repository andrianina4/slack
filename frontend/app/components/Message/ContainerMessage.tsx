import React, { useEffect } from "react";
import ShowMessage from "./ShowMessage";
import { useQuery } from "@tanstack/react-query";
import { getMessageChannel, getMessageDirect } from "@/api/channel";
import { useSocket } from "../socket/SocketProvider";

type PropsContainerMessage = {
  id: number;
  isPrivateMessage?: boolean;
};

export default function ContainerMessage({
  isPrivateMessage,
  id,
}: PropsContainerMessage) {
  const socket = useSocket();
  // const queryClient = useQueryClient();

  const { data, refetch } = useQuery({
    queryKey: ["getMessage"],
    queryFn: () => {
      return isPrivateMessage ? getMessageDirect(id) : getMessageChannel(id);
    },
  });

  useEffect(() => {
    if (socket) {
      console.log("CONNECTED_CHAT", socket.id);
      // socket.emit("joinPrivateChat", { userId: id });
      socket.on("receiveMessage", (params) => {
        console.log("params", params);
        // queryClient.invalidateQueries({ queryKey: ["getMessage"] });
        refetch({});
      });
    }
  }, [socket, id, refetch]);

  if (!data) return null;

  return (
    <div>
      {data.map((item, index) => {
        return (
          <ShowMessage
            key={index}
            datas={{
              content: item.content,
              date: item.timestamp,
              sender: item.sender,
            }}
          />
        );
      })}
    </div>
  );
}
