"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// ----------------- Zod Schema -----------------
const bookingSchema = z.object({
  firstName: z.string({message:'First name is required'}).min(1, "First name is required"),
  lastName: z.string({message:"Last name is required"}).min(1, "Last name is required"),
  email: z.string({message:"Email is required"}).email("Invalid email"),
  phone: z.string({message:"Phone number is required"}).min(6, "Enter valid phone number"),
  eventDate: z.string({message:"Select event date"}).min(1, "Select event date"),
  eventTime: z.string({message:"Select event time"}).min(1, "Enter event time"),
  guests: z.number({message:'Select guest number'}).min(1, "At least 1 guest required"),
  address: z.string({message:"Address is required"}).min(1, "Address is required"),
  specialRequests: z.string().optional(),
  attachment: z
    .any()
    .optional(),
});

// ----------------- Fields -----------------
export type FormField = {
  name: keyof z.infer<typeof bookingSchema>;
  label: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "date" | "textarea" | "file" | "select";
  options?: { label: string; value: string | number }[];
  colSpan?: 1 | 2 | 3;
};

const fields: FormField[] = [
  { name: "firstName", label: "First Name", placeholder: "Enter first name", type: "text", colSpan: 1 },
  { name: "lastName", label: "Last Name", placeholder: "Enter last name", type: "text", colSpan: 1 },
  { name: "email", label: "Email", placeholder: "Enter email", type: "email", colSpan: 1 },
  { name: "phone", label: "Phone", placeholder: "Enter phone number", type: "text", colSpan: 1 },
  { name: "eventDate", label: "Event Date", type: "date", colSpan: 1 },
  { name: "eventTime", label: "Event Time", placeholder: "HH:MM", type: "text", colSpan: 1 },
  { name: "guests", label: "Guests", placeholder: "Number of guests", type: "number", colSpan: 1 },
  { name: "address", label: "Address", type: "textarea", placeholder: "Enter address", colSpan: 2 },
  { name: "specialRequests", label: "Special Requests", type: "textarea", placeholder: "Any special requests?", colSpan: 3 },
  { name: "attachment", label: "Upload File", type: "file", colSpan: 2 },
];

// ----------------- Form Component -----------------
export default function EventBookingForm() {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {},
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    console.log("Booking Data:", data);
    alert("Booking submitted!");
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-white shadow-md rounded-md w-full">
      {fields.map((field) => {
        const colClass = {
          1: "col-span-1",
          2: "col-span-2",
          3: "col-span-3",
        }[field.colSpan || 1];

        return (
          <div key={field.name} className={cn(colClass)}>
            <Label htmlFor={field.name} className="block mb-1 font-medium">
              {field.label}
            </Label>

            <Controller
              control={form.control}
              name={field.name}
              render={({ field: controllerField }) => {
                if (field.type === "textarea") {
                  return (
                    <textarea
                      {...controllerField}
                      placeholder={field.placeholder}
                      className="w-full mt-1 p-2 border rounded-md focus:ring focus:ring-primary/20 focus:border-primary"
                    />
                  );
                }

                if (field.type === "select") {
                  return (
                    <Select
                      value={controllerField.value || ""}
                      onValueChange={controllerField.onChange}
                    >
                      <SelectTrigger className="w-full mt-1">
                        <SelectValue placeholder={field.placeholder || field.label} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }

                if (field.type === "file") {
                  return (
                    <>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          controllerField.onChange(file);
                          if (file) setFilePreview(URL.createObjectURL(file));
                        }}
                        className="mt-1 w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-primary file:text-white hover:file:bg-primary/90"
                      />
                      {filePreview && (
                        <img
                          src={filePreview}
                          alt="File Preview"
                          className="mt-2 w-full max-h-40 object-contain border rounded-md"
                        />
                      )}
                    </>
                  );
                }

                return (
                  <Input
                    {...controllerField}
                    placeholder={field.placeholder}
                    type={field.type || "text"}
                    className="w-full mt-1"
                  />
                );
              }}
            />

            {form.formState.errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors[field.name]?.message as string}
              </p>
            )}
          </div>
        );
      })}

      <div className="col-span-1 sm:col-span-2 lg:col-span-3 mt-4">
        <Button type="submit" className="w-full sm:w-auto">
          Submit Booking
        </Button>
      </div>
    </form>
  );
}
