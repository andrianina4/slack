"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
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
// import { useRouter } from "next/router";
export default function SidebarCustom() {
  const user = useAuth();
  const router = useRouter();

  return (
    <SidebarProvider>
      <Sidebar style={{ width: "300px" }}>
        <SidebarContent>
          <SidebarGroup>
            {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton asChild>
                        <a href={"#"}>
                          {/* <item.icon /> */}
                          <span>#Canaux</span>
                        </a>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>Test</SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
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
