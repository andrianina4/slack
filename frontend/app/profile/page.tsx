import SidebarCustom from "../components/SidebarCustom";

export default function page() {
  return (
    <div className="flex flex-row">
      <div style={{ width: "300px" }}>
        <SidebarCustom />
      </div>
      <div className="flex-1 p-4 ">Profile</div>
    </div>
  );
}
