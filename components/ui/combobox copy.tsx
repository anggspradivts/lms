"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";


interface ComboboxProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
}
export function Combobox({ options, value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleButtonClick = () => {
    // onChange("");
    setOpen((prev) => !prev);
  };

  return (
    <div className="w-40">
      <div className="w-full flex">
        {/* choose option button */}
        <button
          type="button"
          className={cn(
            "p-2 w-full text-start bg-white",
            open && "bg-white rounded-t-xl "
          )}
          onClick={handleButtonClick}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select category..."}
        </button>
        <ChevronsUpDown className="ml-[140px] mt-3 h-4 w-4 shrink-0 opacity-50 absolute" />
      </div>
      {open && (
        <div className="absolute w-40 h-[100px] bg-white overflow-y-scroll rounded-b-xl transition-all duration-300">
          {options.map((option) => {
            return (
              <div className="p-1 w-full" key={option.value}>
                <button
                  onClick={() => {
                    onChange(option.value === value ? "" : option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
