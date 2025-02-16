import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMessageChannel } from "@/api/channel";

type PropsFormPostMessage = {
  id: number;
};

export default function FormPostMessage({ id }: PropsFormPostMessage) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postMessageChannel,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMessageChannel"] });
    },
  });
  const handleClick = async () => {
    console.log({
      recipentChannelId: id,
      message,
    });

    mutation.mutate({
      content: message,
      recipentChannelId: id,
    });

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
