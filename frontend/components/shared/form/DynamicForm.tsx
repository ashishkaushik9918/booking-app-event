/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export type FormField = {
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password" | "date" | "select" | "textarea" | "file";
  required?: boolean;
  options?: { label: string; value: string | number }[];
  colSpan?: 1 | 2 | 3; // only 1, 2, 3
};

interface DynamicFormProps {
  fields: FormField[];
  formData: Record<string, any>;
  onChange: (name: string, value: any) => void;
}

export default function DynamicForm({ fields, formData, onChange }: DynamicFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {fields.map((field) => {
        // Make sure Tailwind picks up static classes
        let colClass = "col-span-1";
        if (field.colSpan === 2) colClass = "col-span-2";
        if (field.colSpan === 3) colClass = "col-span-3";

        return (
          <div key={field.name} className={cn(colClass, "w-full")}>
            <Label htmlFor={field.name}>
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </Label>

            {field.type === "select" ? (
              <Select
                value={formData[field.name] || ""}
                onValueChange={(val) => onChange(field.name, val)}
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((opt) => (
                    <SelectItem key={opt.value} value={String(opt.value)}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : field.type === "textarea" ? (
              <textarea
                id={field.name}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                required={field.required}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="mt-1 block w-full resize-none rounded-md border border-gray-300 p-2 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
              />
            ) : field.type === "file" ? (
              <input
                id={field.name}
                type="file"
                required={field.required}
                onChange={(e) => onChange(field.name, e.target.files?.[0] || null)}
                className="mt-1 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0 file:text-sm file:font-semibold
                           file:bg-primary file:text-white hover:file:bg-primary/90"
              />
            ) : (
              <Input
                id={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={formData[field.name] || ""}
                required={field.required}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="mt-1 w-full"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
