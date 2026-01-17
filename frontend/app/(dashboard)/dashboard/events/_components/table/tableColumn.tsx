"use client"
import { eventTableColumns } from "./table"
import SmartTable from "@/components/common/table/customTable"

export const EventTable = () => {
    return (
        <SmartTable columns={eventTableColumns} dataSource={ []} className="table-context-menu"/>
    );
}