"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown } from "lucide-react";

type PropsMultiSelect = {
  options: { value: number; label: string }[];
  selectedValues: number[];

  cb?: (selectedValue: number) => void;
};

export default function MultiSelect({
  options,
  cb,
  selectedValues,
}: PropsMultiSelect) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[450px] flex justify-between overflow-scroll"
        >
          {selectedValues.length > 0
            ? selectedValues
                .map((val) => options.find((o) => o.value === val)?.label)
                .join(", ")
            : "Sélectionnez..."}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <Checkbox
              id={option.value.toString()}
              checked={selectedValues.includes(option.value)}
              onCheckedChange={() => {
                // toggleValue(option.value);
                if (cb) cb(option.value);
              }}
            />
            <label htmlFor={option.value.toString()} className="cursor-pointer">
              {option.label}
            </label>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
