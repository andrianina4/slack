import SidebarCustom from "./SidebarCustom";

export default function AllSideBar() {
  return (
    <div className="flex flex-row">
      <div style={{ width: "300px" }}>
        <SidebarCustom />
      </div>
      <div className="flex-1 p-4 ">
        {/* <h1>Éléments à droite</h1>
        <p>
          Voici un exemple d élément placé à droite de la sidebar. Lorem ipsum
          dolor sit amet, consectetur adipisicing elit. Numquam rerum magni
          illum vel inventore obcaecati dolor voluptate quo quasi sunt pariatur
          quam, dolorum incidunt dicta suscipit repellat voluptates voluptatum
          facilis.
        </p> */}
      </div>
    </div>
  );
}
