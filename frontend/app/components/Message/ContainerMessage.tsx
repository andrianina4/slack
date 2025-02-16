import React from "react";
import ShowMessage from "./ShowMessage";
import { useQuery } from "@tanstack/react-query";
import { getMessageChannel } from "@/api/channel";

type PropsContainerMessage = {
  id: number;
  isPrivateMessage?: boolean;
};

export default function ContainerMessage({
  id,
}: // isPrivateMessage,
PropsContainerMessage) {
  const { data } = useQuery({
    queryKey: ["getMessageChannel"],
    queryFn: () => {
      return getMessageChannel(id);
    },
  });

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
