// @ts-nocheck
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getAllUser } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import FormPostMessage from "./FormPostMessage";

type PropsFormDirectMessage = {
  cb?: () => void;
};

export function FormDirectMessage({ cb }: PropsFormDirectMessage) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number>(0);

  const { data } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: getAllUser,
  });

  if (!data) return null;

  const dataMapped = data.find((user) => user.id === value);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className=" w-full justify-between"
          >
            {value && dataMapped
              ? `${dataMapped?.firstname} ${dataMapped?.lastname}`
              : "Choisir une personne"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>Utilisateur non trouvé</CommandEmpty>
              <CommandGroup>
                {data.map((user) => (
                  <CommandItem
                    key={user.id}
                    value={user.id}
                    onSelect={() => {
                      setValue(user.id);
                      setOpen(false);
                    }}
                  >
                    {user.firstname} {user.lastname}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === user.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="mt-5 flex items-center gap-2">
        {dataMapped && (
          <FormPostMessage id={dataMapped.id} isPrivateMessage={true} cb={cb} />
        )}
      </div>
    </div>
  );
}
