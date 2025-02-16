import React from "react";
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
type PropsHearderMessage = {
  id: number;
};

export default function HearderMessage({ id }: PropsHearderMessage) {
  const { data } = useQuery({
    queryKey: ["getConfigChannel"],
    queryFn: () => {
      return getConfigChannel(id);
    },
  });

  if (!data) return null;

  const { channel, members } = data;

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>{channel.name}</MenubarTrigger>

          <div className="flex grow justify-end">
            <Badge variant="outline">
              <UserRound size={14} /> : {members.length}
            </Badge>
          </div>
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
