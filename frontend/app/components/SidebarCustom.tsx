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

type PropsGroupedMenu = {
  label: string;
};

const GroupedMenu = ({ label }: PropsGroupedMenu) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-zinc-400">
        <DropdownCustom title={label} />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <Collapsible defaultOpen className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <a href={"#"}>
                    <Earth />
                    <span>Publique</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>#test-rh</SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton asChild>
                  <a href={"#"}>
                    <Lock />
                    <span>Privée</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>#test-rh</SidebarMenuSubItem>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default function SidebarCustom() {
  const user = useAuth();
  const router = useRouter();

  return (
    <SidebarProvider>
      <Sidebar style={{ width: "300px" }}>
        <SidebarContent>
          <GroupedMenu label="Listes des canaux" />
        </SidebarContent>

        <SidebarFooter className="cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex items-center cursor-pointer gap-2.5">
                <Avatar>
                  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                  <AvatarFallback>
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
