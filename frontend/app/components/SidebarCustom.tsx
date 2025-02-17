"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  //   SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { Circle, Earth, Lock, User } from "lucide-react";
import DropdownCustom from "./DropdownCustom";
import { useQuery } from "@tanstack/react-query";
import { getMyChannel, getMyConversation } from "@/api/channel";
import { IChannel, IUser } from "@/interfaces/entity";
import AvatarCustom from "./AvatarCustom";
import { Separator } from "@radix-ui/react-separator";
import { useEffect, useState } from "react";
import { useSocket } from "./socket/SocketProvider";

type PropsGroupedMenu = {
  label: string;
  channels: IChannel[];
};

const GroupedMenuChannel = ({ label, channels }: PropsGroupedMenu) => {
  const router = useRouter();
  const publicChannel = channels.filter((item) => item.isPublic);
  const privateChannel = channels.filter((item) => !item.isPublic);

  const handleRouteGroup = (id: number) => {
    router.push(`/message/group/${id}`);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-zinc-400">
        <DropdownCustom title={`${label} (${channels.length})`} />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <a href={"#"}>
                    <Earth />
                    <span>Publique ({publicChannel.length})</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {publicChannel.map((item) => {
                  return (
                    <SidebarMenuSub key={item.id} className="cursor-pointer">
                      <SidebarMenuSubItem
                        onClick={() => {
                          handleRouteGroup(item.id);
                        }}
                      >
                        {item.name}
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  );
                })}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>

          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <a href={"#"}>
                    <Lock />
                    <span>Privée ({privateChannel.length})</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                {privateChannel.map((item) => {
                  return (
                    <SidebarMenuSub key={item.id} className="cursor-pointer">
                      <SidebarMenuSubItem
                        onClick={() => {
                          handleRouteGroup(item.id);
                        }}
                      >
                        {item.name}
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  );
                })}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

type PropsGroupeMenuDirect = {
  users: IUser[];
};

type CustomUser = IUser & { connected: number };

const GroupeMenuDirect = ({ users }: PropsGroupeMenuDirect) => {
  const socket = useSocket();

  const [statusUser, setStatusUser] = useState<Record<string, number>>({});
  const [usersConnected, setUsersConnected] = useState<CustomUser[]>([]);

  useEffect(() => {
    setUsersConnected(
      users.map((item) => {
        return { ...item, connected: 0 };
      })
    );
  }, [users]);

  useEffect(() => {
    if (socket) {
      socket.on("userStatus", (params: { userId: string; status: number }) => {
        console.log("Changed status", params);
        setStatusUser((prev) => ({ ...prev, [params.userId]: params.status }));
      });
    }
  }, [socket, usersConnected]);

  const router = useRouter();

  const handleRouteDirect = (id: number) => {
    router.push(`/message/direct/${id}`);
  };

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton asChild>
                <a href={"#"}>
                  <User />
                  <span>Message Direct ({usersConnected.length})</span>
                </a>
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              {usersConnected.map((user) => {
                return (
                  <SidebarMenuSub
                    className="cursor-pointer"
                    key={user.id}
                    onClick={() => {
                      handleRouteDirect(user.id);
                    }}
                  >
                    <SidebarMenuSubItem className="flex gap-1.5 items-center">
                      {user.firstname} {user.lastname}{" "}
                      <Circle
                        className={
                          typeof statusUser[user.id] !== "undefined" &&
                          statusUser[user.id.toString()] === 0
                            ? "text-red-500"
                            : "text-green-500"
                        }
                        size={10}
                        fill={
                          typeof statusUser[user.id] !== "undefined" &&
                          statusUser[user.id.toString()] === 0
                            ? "red"
                            : "green"
                        }
                      />
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                );
              })}
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroupContent>
  );
};

export default function SidebarCustom() {
  // Access the client
  // const queryClient = useQueryClient();
  // Queries
  const { data } = useQuery({
    queryKey: ["getMyChannel"],
    queryFn: getMyChannel,
  });

  const { data: userConversation } = useQuery({
    queryKey: ["getMyConversation"],
    queryFn: getMyConversation,
  });

  const user = useAuth();
  const router = useRouter();

  const channels = data || [];
  const listeUsers = userConversation || [];

  return (
    <SidebarProvider>
      <Sidebar style={{ width: "300px" }}>
        <SidebarContent>
          <GroupedMenuChannel label="Listes des canaux" channels={channels} />
          <GroupeMenuDirect users={listeUsers} />
        </SidebarContent>

        <SidebarFooter className="cursor-pointer">
          <Separator />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center cursor-pointer gap-2.5">
                <AvatarCustom user={user} />
                <div className="text-xs text-left grow font-semibold">
                  {user?.firstname} {user?.lastname}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ width: "20%" }}>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await fetch("http://localhost/api/auth/logout", {
                    method: "POST",
                  });

                  window.location.reload();
                }}
              >
                Se déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
}
