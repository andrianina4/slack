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
import { EllipsisVertical, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getConfigChannel } from "@/api/channel";
import { getUser } from "@/api/user";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ModalCustom from "../ModalCustom";
import ListUser from "./ListUser";
type PropsHearderMessage = {
  id: number;
  isPrivateMessage?: boolean;
};

export default function HearderMessage({
  id,
  isPrivateMessage,
}: PropsHearderMessage) {
  const [modalUser, setModalUser] = useState(false);

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
              </Badge>{" "}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <EllipsisVertical className="cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Paramètres</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Modifier ce groupe</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setModalUser(true)}>
                    Ajouter une personne
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </MenubarMenu>
      </Menubar>

      <ModalCustom
        open={modalUser}
        title={`#${configChannel?.channel.name}`}
        content={
          <div>
            {/* <p>
              Les conversations articulées autour d’un thème ont lieu dans les
              canaux. Choisissez un nom simple et clair.
            </p> */}
            <ListUser channelId={id} />
          </div>
        }
        onClose={(value) => setModalUser(value)}
      />
    </div>
  );
}
