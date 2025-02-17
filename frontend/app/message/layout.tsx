import React from "react";
import SidebarCustom from "../components/SidebarCustom";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row">
      <div style={{ width: "300px" }}>
        <SidebarCustom />
      </div>
      <div className="flex-1 p-4 ">{children}</div>
    </div>
  );
}
