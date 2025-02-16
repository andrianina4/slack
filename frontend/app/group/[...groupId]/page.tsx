import MessageComponent from "@/app/components/MessageComponent";
import React from "react";

export default function page(props: {
  params: {
    groupId: string;
  };
}) {
  const {
    params: { groupId },
  } = props;

  console.log("groupId", groupId);

  return (
    <div>
      <MessageComponent id={Number(groupId)} />
    </div>
  );
}
