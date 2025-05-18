import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Settings, ChevronDown } from "lucide-react";
import { usePagination } from '@/core/api/hooks';

export type Column<T> = {
  accessorKey: keyof T;
  header: string;
  cell?: (props: { row: { getValue: () => T[keyof T] } }) => React.ReactNode;
};

interface DataTableProps<T> {
  columns: Column<T>[];
  queryKey: string;
  baseUrl: string;
  initialPageSize?: number;
  pageSizeOptions?: number[];
  filterPlaceholder?: string;
  filterKey?: keyof T;
  onFilterChange?: (value: string) => void;
}

export function DataTable<T extends { id: string | number }>({ 
  columns,
  queryKey,
  baseUrl,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  filterPlaceholder,
  filterKey,
  onFilterChange,
}: DataTableProps<T>) {
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  const [filterValue, setFilterValue] = useState("");

  const {
    data: paginatedData,
    pagination: {
      page,
      limit,
      goToPage,
      setPageSize,
      setSorting,
      totalPages,
      hasNextPage,
      hasPrevPage
    },
    isLoading,
    error
  } = usePagination<T>(
    queryKey,
    baseUrl,
    { page: 1, limit: initialPageSize }
  );

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    onFilterChange?.(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        {filterKey && onFilterChange && (
          <div className="flex items-center gap-2">
            <Input
              placeholder={filterPlaceholder || "Filter..."}
              value={filterValue}
              onChange={(event) => handleFilterChange(event.target.value)}
              className="max-w-sm"
            />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Settings className="mr-2 h-4 w-4" />
              View
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={String(column.accessorKey)}
                className="capitalize"
                checked={columnVisibility[String(column.accessorKey)]}
                onCheckedChange={(value) =>
                  setColumnVisibility({
                    ...columnVisibility,
                    [String(column.accessorKey)]: value,
                  })
                }
              >
                {column.header}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {columns.map((column) => (
              <TableHead
                key={String(column.accessorKey)}
                className="capitalize"
              >
                {column.header}
              </TableHead>
            ))}
          </TableHeader>
          <TableBody>
            {paginatedData?.data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={String(column.accessorKey)}>
                    {column.cell 
                      ? column.cell({ row: { getValue: () => row[column.accessorKey] } })
                      : String(row[column.accessorKey])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div>
          <select
            value={limit}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border rounded p-1"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size} per page
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page - 1)}
            disabled={!hasPrevPage}
          >
            Previous
          </Button>
          <span className="mx-2">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(page + 1)}
            disabled={!hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
