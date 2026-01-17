"use client"
import GlobalFormHorizontal from "@/components/common/form/globalFormHorizontal";
import { FieldType } from "@/types/form";

export const eventCategoryCreateFields: FieldType[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter event category name",
    required: true,
    colSpan: 8,
  },
  {
    name: "slug",
    label: "Slug",
    type: "text",
    placeholder: "auto-generated or enter manually",
    required: true,
    colSpan: 8,
  },
  {
    name: "type",
    label: "Category Type",
    type: "select",
    placeholder: "Select category type",
    required: true,
    colSpan: 8,
    options: [
      { label: "Event", value: "event" },
      { label: "Trip", value: "trip" },
      { label: "Service", value: "service" },
    ],
  },
  {
    name: "parent_id",
    label: "Parent Category",
    type: "select",
    placeholder: "Select parent category (optional)",
    required: false,
    colSpan: 8,
    options: [], // load dynamically
  },

  {
    name: "status",
    label: "Status",
      type: "select",
    placeholder:"Select Status",
    required: true,
    colSpan: 8,
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    name: "display_order",
    label: "Display Order",
    type: "number",
    placeholder: "Enter display order",
    required: false,
    colSpan: 8,
  },
  {
    name: "icon",
    label: "Icon",
    type: "text",
    placeholder: "Icon class (optional)",
    required: false,
    colSpan: 8,
  },
  {
    name: "banner",
    label: "Banner",
    type: "file",
    required: false,
    colSpan: 8,
    },
    {
    name: "description",
    label: "Description",
    type: "textarea",
    placeholder: "Enter category description",
    rows: 4,
    required: false,
    colSpan: 24,
  },
];


export default function CategoryCreateForm() {
    const handleSubmit = async (formData: Record<string,string>) => { }
    
    return (
        <GlobalFormHorizontal onFinish={handleSubmit} fields={eventCategoryCreateFields} submitText="Create Category"/>
    );
}