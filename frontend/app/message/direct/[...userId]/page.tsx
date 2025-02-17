import MessageComponent from "@/app/components/MessageComponent";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;

  return (
    <div>
      <MessageComponent id={Number(userId)} isPrivateMessage={true} />
    </div>
  );
}
