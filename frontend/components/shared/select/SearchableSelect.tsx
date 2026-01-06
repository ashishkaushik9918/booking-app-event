"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchableSelectProps {
  label: string;
  placeholder?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  label,
  placeholder = "Select...",
  options,
  value,
  onChange,
}: SearchableSelectProps) {
  const [search, setSearch] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [open, setOpen] = useState(false);


  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <Input
        placeholder={placeholder}
        value={search || value}
        onFocus={() => setOpen(true)}
        onChange={(e) => setSearch(e.target.value)}
        className="cursor-pointer"
      />

      {open && (
        <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-background shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <li
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setSearch("");
                  setOpen(false);
                }}
                className="cursor-pointer px-3 py-2 hover:bg-muted"
              >
                {opt}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              No results
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
