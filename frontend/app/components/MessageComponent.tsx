"use client";
import HearderMessage from "./Message/HearderMessage";

import ContainerMessage from "./Message/ContainerMessage";
import FormPostMessage from "./Message/FormPostMessage";

export default function MessageComponent({
  id,
  isPrivateMessage,
}: {
  id: number;
  isPrivateMessage?: boolean;
}) {
  return (
    <div className="h-screen flex flex-col relative max-w-[calc(100vw-16rem)]">
      <div className="fixed top-2 left-78 right-4 max-w-[calc(100vw-16rem)] mx-auto">
        <HearderMessage id={id} isPrivateMessage={isPrivateMessage} />
      </div>
      <div className="flex-1 overflow-y-scroll mt-20 mb-20">
        <ContainerMessage id={id} isPrivateMessage={isPrivateMessage} />
      </div>

      <div className="fixed bottom-2 left-78 right-4 max-w-[calc(100vw-16rem)] mx-auto flex gap-2 items-center">
        <FormPostMessage id={id} isPrivateMessage={isPrivateMessage} />
      </div>
    </div>
  );
}
