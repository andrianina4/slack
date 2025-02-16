import MessageComponent from "@/app/components/MessageComponent";
import React from "react";

export default function page(props: {
  params: {
    userId: string;
  };
}) {
  const {
    params: { userId },
  } = props;

  return (
    <div>
      <MessageComponent id={Number(userId)} isPrivateMessage={true} />
    </div>
  );
}
