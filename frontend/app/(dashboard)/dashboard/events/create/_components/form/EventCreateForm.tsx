"use client"
import GlobalFormHorizontal from "@/components/common/form/globalFormHorizontal";
import { eventCreateFormField } from "../../../utils/field";
import AlertDialog from "@/components/common/alert/AlertDialog";
import React from "react";
import { Button } from "antd";
export default function EventCreateForm() {
    const [showAlert,setShowAlert]=React.useState(false);
    const handleFormSubmit = async (formData: Record<string, string>) => { }
    const handleAlert = () => setShowAlert(prev => !prev);
    
    return (
        <>
          <GlobalFormHorizontal fields={eventCreateFormField} onFinish={handleFormSubmit}
            submitText="Create Event"
            />
            <Button onClick={handleAlert}>Click To Alert</Button>
            <AlertDialog visible={showAlert} onClose={handleAlert} />
        </>
    );
}