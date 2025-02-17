import MessageComponent from "@/app/components/MessageComponent";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const groupId = (await params).groupId;

  return (
    <div>
      <MessageComponent id={Number(groupId)} />
    </div>
  );
}
