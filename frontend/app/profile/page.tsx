"use client";
import { Separator } from "@/components/ui/separator";
import SidebarCustom from "../components/SidebarCustom";
import { FormProfile } from "./FormProfile";
import { useAuth } from "../hooks/useAuth";

export default function Page() {
  const user = useAuth();

  return (
    <div className="flex flex-row">
      <div style={{ width: "300px" }}>
        <SidebarCustom />
      </div>
      <div className="flex-1 p-4 ">
        <h3 className="mb-2.5">Profile</h3>
        <Separator />

        <FormProfile user={user} />
      </div>
    </div>
  );
}
