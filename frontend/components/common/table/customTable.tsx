/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { useState } from "react";
import { ColumnType } from 'antd/es/table';
import { Checkbox } from 'antd';



export type SmartColumn<T> = ColumnType<T> & {
  isFilter?: boolean;
  hidden?: boolean;
};
export default function SmartTable({
  columns,
  dataSource,
  rowKey = "id",
  expandableRender,
  rowSelection,
  filters = {},
  setFilters,
  onApplyFilters,
  headerContent,
  contextAction,
  name,
  ...rest
}: any) {
   console.count('StudentTable render');
  const STORAGE_KEY = name;
  const [expandedRow, setExpandedRow] = useState<React.Key | null>(null);
  const filterColumns = columns.filter((col: any) => col.isFilter);

  const [visibleColumns, setVisibleColumns] = useState<React.Key[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    }
    return columns.map((col: any) => col.key || col.dataIndex);
  });

  const filteredColumns = columns.filter(
    (col: any) => visibleColumns.includes(col.key || col.dataIndex)
  );


  const handleColumnToggle = (key: React.Key) => {
    setVisibleColumns((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      return updated;
    });
  };



  const menuItems = columns.map((col: any) => {
    const key = col.key || col.dataIndex;
    return {
      key,
      label: (
        <Checkbox
          checked={visibleColumns.includes(key)}
          onChange={() => handleColumnToggle(key)}
        >
          {col.title}
        </Checkbox>
      ),
    };
  });

  return (
    <div className="flex flex-col">
      <div className="relative"      >
        <Table
          columns={filteredColumns}
          dataSource={dataSource}
          rowKey={rowKey}
          rowSelection={rowSelection}
          expandable={
            expandableRender && {
              expandedRowRender: expandableRender,
              expandedRowKeys: expandedRow ? [expandedRow] : [],
              onExpand: (expanded, record) => {
                const id =
                  typeof rowKey === "function" ? rowKey(record) : record[rowKey];
                setExpandedRow(expanded ? id : null);
              },
            }
          }
          {...rest}/>
      </div>


    </div>
  );
}
