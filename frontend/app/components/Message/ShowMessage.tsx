import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitialName } from "@/lib";

export default function ShowMessage() {
  return (
    <div className="mt-2.5 ml-1.5 flex gap-2.5 ">
      <Avatar>
        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
        <AvatarFallback className="bg-amber-400">
          {getInitialName("Andrianina")}
          {getInitialName("RAHERIMANANTSOA")}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">
          Andrianina RAHERIMANANTSOA{" "}
          <span className="font-normal text-sm text-gray-500">16/02/2025</span>
        </p>
        <p>
          Hello , Oui , on a un problème au niveau de notre serveur J ai quand
          même essayer de résoudre de mon coté mais ça ne marche pas Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Laboriosam maiores saepe
          aperiam, ab non error culpa atque fugit repellat magnam velit
          reprehenderit eum iusto voluptate illum eius modi quia deleniti. Lorem
          ipsum dolor sit amet, consectetur adipisicing elit. Officia atque,
          facere corrupti alias illum nemo, voluptatum aliquid voluptatibus
          ullam delectus consequatur pariatur dolore obcaecati dolor ipsa
          facilis suscipit repellendus optio.
        </p>
      </div>
    </div>
  );
}
