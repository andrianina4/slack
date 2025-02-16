"use client";
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
import { useAuth } from "@/app/hooks/useAuth";
import { FormGroup } from "../FormGroup";
type PropsHearderMessage = {
  id: number;
  isPrivateMessage?: boolean;
};

export default function HearderMessage({
  id,
  isPrivateMessage,
}: PropsHearderMessage) {
  const auth = useAuth();
  const [modalUser, setModalUser] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

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

  const owner = configChannel?.members.find(
    (item) => item.user.id === auth?.id && item.isOwner
  );

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>{stateHeader.title}</MenubarTrigger>

          {!isPrivateMessage && (
            <div className="flex grow justify-end">
              <Badge
                variant="outline"
                className="cursor-pointer"
                onClick={() => setModalUser(true)}
              >
                <UserRound size={14} /> : {stateHeader.countMembers}
              </Badge>{" "}
              {owner && (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Paramètres</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setModalUpdate(true)}>
                      Modifier ce groupe
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setModalUser(true)}>
                      Ajouter une personne
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          )}
        </MenubarMenu>
      </Menubar>

      <ModalCustom
        open={modalUser}
        title={`#${configChannel?.channel.name}`}
        content={
          <div>
            <ListUser channelId={id} isOwner={Boolean(owner)} />
          </div>
        }
        onClose={(value) => setModalUser(value)}
      />

      <ModalCustom
        open={modalUpdate}
        title={`#${configChannel?.channel.name}`}
        content={
          <div>
            <FormGroup channel={configChannel?.channel} />
          </div>
        }
        onClose={(value) => setModalUpdate(value)}
      />
    </div>
  );
}
