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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { getInitialName } from "@/lib";
import { Earth, Lock } from "lucide-react";
import DropdownCustom from "./DropdownCustom";
import { useQuery } from "@tanstack/react-query";
import { getMyChannel } from "@/api/channel";
import { IChannel } from "@/interfaces/entity";

type PropsGroupedMenu = {
  label: string;
  channels: IChannel[];
};

const GroupedMenu = ({ label, channels }: PropsGroupedMenu) => {
  const router = useRouter();
  const publicChannel = channels.filter((item) => item.isPublic);
  const privateChannel = channels.filter((item) => !item.isPublic);

  const handleRoute = (id: number) => {
    router.push(`/group/${id}`);
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
                          handleRoute(item.id);
                        }}
                      >
                        {item.name}
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  );
                })}
              </CollapsibleContent>
            </SidebarMenuItem>

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
                          handleRoute(item.id);
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

export default function SidebarCustom() {
  // Access the client
  // const queryClient = useQueryClient();
  // Queries
  const { data } = useQuery({
    queryKey: ["getMyChannel"],
    queryFn: getMyChannel,
  });
  const user = useAuth();
  const router = useRouter();

  const channels = data || [];

  console.log("data", data);

  return (
    <SidebarProvider>
      <Sidebar style={{ width: "300px" }}>
        <SidebarContent>
          <GroupedMenu label="Listes des canaux" channels={channels} />
        </SidebarContent>

        <SidebarFooter className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center cursor-pointer gap-2.5">
                <Avatar className=" text-white">
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback className="bg-[#424040]">
                    {getInitialName(user?.firstname)}
                    {getInitialName(user?.lastname)}
                  </AvatarFallback>
                </Avatar>

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
