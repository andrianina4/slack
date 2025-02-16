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
import { FormDirectMessage } from "./Message/FormDirectMessage";
import { useQueryClient } from "@tanstack/react-query";

type PropsDropdownCustom = {
  title: string;
};

export default function DropdownCustom({ title }: PropsDropdownCustom) {
  const [state, setState] = useState(false);
  const [stateDirect, setStateDirect] = useState(false);
  const queryClient = useQueryClient();
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

            <DropdownMenuItem onClick={() => setStateDirect(true)}>
              Commencer une message direct
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

            <FormGroup
              cb={() => {
                console.log("Evaluted");

                queryClient.invalidateQueries({
                  queryKey: ["getMyChannel"],
                });
                setState(false);
              }}
            />
          </div>
        }
        onClose={(value) => setState(value)}
      />

      <ModalCustom
        open={stateDirect}
        title="Message direct"
        content={
          <div>
            <p>Seuls vous et la personne pouvez voir les messages.</p>

            <Separator className="mt-2 mb-2" />

            <FormDirectMessage
              cb={() => {
                console.log("getMyConversation");

                queryClient.invalidateQueries({
                  queryKey: ["getMyConversation"],
                });

                setStateDirect(false);
              }}
            />
          </div>
        }
        onClose={(value) => setStateDirect(value)}
      />
    </>
  );
}
