import React from "react";

export default function page(props: {
  params: {
    groupId: string;
  };
}) {
  const {
    params: { groupId },
  } = props;

  return <div>{groupId}</div>;
}
