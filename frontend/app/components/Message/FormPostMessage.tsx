import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMessageChannel } from "@/api/channel";
import { TypePostMessageChannel } from "@/interfaces/entity";
import { useAuth } from "@/app/hooks/useAuth";
import { useSocket } from "../socket/SocketProvider";

type PropsFormPostMessage = {
  id: number;
  isPrivateMessage?: boolean;
  cb?: () => void;
};

export default function FormPostMessage({
  id,
  isPrivateMessage,
  cb,
}: PropsFormPostMessage) {
  const auth = useAuth();
  const socket = useSocket();
  const queryClient = useQueryClient();

  const [message, setMessage] = useState("");
  const mutation = useMutation({
    mutationFn: postMessageChannel,
    onSuccess: (responseBackend) => {
      queryClient.invalidateQueries({ queryKey: ["getMessage"] });

      socket?.emit("sendMessage", {
        senderId: auth?.id,
        receiverId: isPrivateMessage
          ? responseBackend.recipentUser?.id
          : responseBackend.recipentGroup?.groupeMembers.map(
              (item) => item.user.id
            ),
        content: responseBackend.content,
      });

      if (cb) cb();
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
