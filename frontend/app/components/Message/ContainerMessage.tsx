import React from "react";
import ShowMessage from "./ShowMessage";
import { useQuery } from "@tanstack/react-query";
import { getMessageChannel } from "@/api/channel";

type PropsContainerMessage = {
  id: number;
};

export default function ContainerMessage({ id }: PropsContainerMessage) {
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
        return <ShowMessage key={index} />;
      })}
    </div>
  );
}
