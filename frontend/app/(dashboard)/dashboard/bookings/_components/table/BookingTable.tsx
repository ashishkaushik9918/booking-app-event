"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Booking = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  eventDate: string;
  eventTime: string;
  guests: number;
  address: string;
  specialRequests?: string;
  attachment?: string;
  status: "Pending" | "Confirmed" | "Cancelled";
};

interface BookingTableProps {
  data: Booking[];
  onStatusChange?: (id: number, status: Booking["status"]) => void; // callback
}

export default function BookingTable({ data, onStatusChange }: BookingTableProps) {
  const [tableData, setTableData] = useState<Booking[]>(data);
  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Booking>[]>(
    () => [
      { accessorKey: "id", header: "ID" },
      { accessorKey: "firstName", header: "First Name" },
      { accessorKey: "lastName", header: "Last Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "eventDate", header: "Date" },
      { accessorKey: "eventTime", header: "Time" },
      { accessorKey: "guests", header: "Guests" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "specialRequests", header: "Notes" },
      {
        accessorKey: "attachment",
        header: "Attachment",
        cell: (info) =>
          info.getValue() ? (
            <a
              href={info.getValue() as string}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              View
            </a>
          ) : (
            "N/A"
          ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row, getValue }) => (
          <Select
            value={getValue() as string}
            onValueChange={(val) => {
              const newData = tableData.map((item) =>
                item.id === row.original.id ? { ...item, status: val as Booking["status"] } : item
              );
              setTableData(newData);
              onStatusChange?.(row.original.id, val as Booking["status"]);
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Confirmed">Confirmed</SelectItem>
              <SelectItem value="Cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        ),
      },
    ],
    [tableData, onStatusChange]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  return (
    <div className="p-4 w-full overflow-x-auto bg-white rounded-md shadow-sm">
      {/* Search */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between gap-2">
        <Input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>

      {/* Table */}
      <Table className="text-sm">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="cursor-pointer select-none"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <span className="ml-1">
                    {header.column.getIsSorted()
                      ? header.column.getIsSorted() === "desc"
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="mt-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
        <div>
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </strong>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Prev
          </Button>
          <Button
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
