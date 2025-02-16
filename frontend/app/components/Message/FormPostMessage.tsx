import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMessageChannel } from "@/api/channel";
import { TypePostMessageChannel } from "@/interfaces/entity";

type PropsFormPostMessage = {
  id: number;
  isPrivateMessage?: boolean;
};

export default function FormPostMessage({
  id,
  isPrivateMessage,
}: PropsFormPostMessage) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postMessageChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMessage"] });
    },
  });
  const handleClick = async () => {
    const bodySend: TypePostMessageChannel = {
      content: message,
    };

    if (isPrivateMessage) {
      bodySend.recipentUserId = id;
    } else {
      bodySend.recipentChannelId = id;
    }

    mutation.mutate(bodySend);

    setMessage("");
  };

  return (
    <>
      <Textarea
        placeholder="Envoyer un message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
      />
      <Button
        className="cursor-pointer"
        disabled={!message}
        onClick={handleClick}
      >
        Envoyer
      </Button>
    </>
  );
}
