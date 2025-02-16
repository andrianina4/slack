"use client";
import { Button } from "@/components/ui/button";
import HearderMessage from "./Message/HearderMessage";
import { Textarea } from "@/components/ui/textarea";
import ShowMessage from "./Message/ShowMessage";
import ContainerMessage from "./Message/ContainerMessage";

export default function MessageComponent({ channelId }: { channelId: number }) {
  return (
    <div className="h-screen flex flex-col relative max-w-[calc(100vw-16rem)]">
      <div className="fixed top-2 left-78 right-4 max-w-[calc(100vw-16rem)] mx-auto">
        <HearderMessage id={channelId} />
      </div>
      <div className="flex-1 overflow-y-scroll mt-20 mb-20">
        <ContainerMessage id={channelId} />
      </div>

      <div className="fixed bottom-2 left-78 right-4 max-w-[calc(100vw-16rem)] mx-auto flex gap-2 items-center">
        <Textarea placeholder="Envoyer un message" />
        <Button className="cursor-pointer">Envoyer</Button>
      </div>
    </div>
  );
}
