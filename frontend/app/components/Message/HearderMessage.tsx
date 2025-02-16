import React, { useEffect, useState } from "react";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  //   MenubarContent,
  //   MenubarItem,
  //   MenubarSeparator,
  //   MenubarShortcut,
} from "@/components/ui/menubar";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getConfigChannel } from "@/api/channel";
import { getUser } from "@/api/user";
type PropsHearderMessage = {
  id: number;
  isPrivateMessage?: boolean;
};

export default function HearderMessage({
  id,
  isPrivateMessage,
}: PropsHearderMessage) {
  const [stateHeader, setStateHeader] = useState({
    title: "",
    countMembers: 0,
  });

  const { data: user } = useQuery({
    queryKey: ["getUser"],
    queryFn: () => {
      return getUser(id);
    },
  });
  const { data: configChannel } = useQuery({
    queryKey: ["getConfigChannel"],
    queryFn: () => {
      return getConfigChannel(id);
    },
  });

  useEffect(() => {
    if (isPrivateMessage && user) {
      setStateHeader({
        title: `${user.firstname} ${user.lastname}`,
        countMembers: 0,
      });
    } else if (!isPrivateMessage && configChannel) {
      setStateHeader({
        title: configChannel.channel.name,
        countMembers: configChannel.members.length,
      });
    }
  }, [isPrivateMessage, configChannel, user]);

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>{stateHeader.title}</MenubarTrigger>

          {!isPrivateMessage && (
            <div className="flex grow justify-end">
              <Badge variant="outline">
                <UserRound size={14} /> : {stateHeader.countMembers}
              </Badge>
            </div>
          )}
          {/* <MenubarContent>
            <MenubarItem>
              New Tab <MenubarShortcut>⌘T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Print</MenubarItem>
          </MenubarContent> */}
        </MenubarMenu>
      </Menubar>
    </div>
  );
}
