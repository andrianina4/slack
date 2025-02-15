import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CirclePlus } from "lucide-react";
import ModalCustom from "./ModalCustom";
import { FormGroup } from "./FormGroup";
import { Separator } from "@/components/ui/separator";

type PropsDropdownCustom = {
  title: string;
};

export default function DropdownCustom({ title }: PropsDropdownCustom) {
  const [state, setState] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="text-base flex flex-row gap-2.5 items-center">
            {title} <CirclePlus size={19} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setState(true)}>
              Créer un canal
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <ModalCustom
        open={state}
        title="Création d'un nouveau canal"
        content={
          <div>
            <p>
              Les conversations articulées autour d’un thème ont lieu dans les
              canaux. Choisissez un nom simple et clair.
            </p>

            <Separator className="mt-2 mb-2" />

            <FormGroup />
          </div>
        }
        onClose={(value) => setState(value)}
      />
    </>
  );
}
