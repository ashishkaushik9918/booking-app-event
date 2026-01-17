"use client"
import GlobalFormHorizontal from "@/components/common/form/globalFormHorizontal";
import { eventCreateFormField } from "../../../utils/field";

export default function EventCreateForm() {
    const handleFormSubmit = async (formData: Record<string,string>) => { }
    return (
        <GlobalFormHorizontal fields={eventCreateFormField} onFinish={handleFormSubmit}
            submitText="Create Event"
        />
    );
}