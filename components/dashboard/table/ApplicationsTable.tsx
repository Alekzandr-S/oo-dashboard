"use client"

import { useCurrentUser } from "@/components/providers/UserProvider"
import { ApplicationTableRow, getApplicationTableData } from "@/lib/mock/data";
import { useState } from "react";
import { useApplicationActions } from "./ApplicationsAction";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { createApplicationColumns } from "./ApplicationsColumns";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ApplicationsDialog from "./ApplicationsDialog";
import ApplicationsToolbar from "./ApplicationsToolbar";

export function ApplicationsTable() {
  const {user} = useCurrentUser();
  if (!user) return null;

  const role = user.role;
  const userId = user.id;

  const [localData, setLocalData] = useState(() => getApplicationTableData(role, userId))
  const [detailOpen, setDetailOpen] = useState(false)
  const [selected, setSelected] = useState<ApplicationTableRow | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPayment, setFilterPayment] = useState("all")

  const actions = useApplicationActions(role, userId, setLocalData)

  const filterData = localData.filter(row => {
    const matchesSearch = row.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase());
    const matchesStatus = filterStatus === "all" || row.status === filterStatus;
    const matchesPayment = filterPayment === "all" || row.paymentStatus === filterPayment;
    return matchesSearch && matchesStatus && matchesPayment;
  })
  
  const table = useReactTable({
    data: filterData,
    columns: createApplicationColumns(role, (row) => {
      setSelected(row)
      setDetailOpen(true)
    }, actions),
    getCoreRowModel: getCoreRowModel(),
  })

 const handleSort = (key: "title" | "date", direction: "asc" | "desc") => {
  const sorted = [...localData].sort((a, b) => {
    if (key === "title") return direction === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    if (key === "date") return direction === "asc" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date)
    return 0
  })
  setLocalData(sorted)
}


  return (
    <div className="rounded-xl border mt-6 px-4 lg:px-6 overflow-hidden">
      {/* <ApplicationsToolbar 
        onSearch={setSearchTerm}
        onFilterStatus={setFilterStatus}
        onFilterPayment={setFilterPayment}
        onSort={handleSort}
      /> */}
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map(hg => (
            <TableRow key={hg.id}>
              {hg.headers.map(h => (
                <TableHead key={h.id}>{h.isPlaceholder ? null : String(h.column.columnDef.header)}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow key={row.id} className="hover:bg-muted/50">
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ApplicationsDialog
        selected={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        isSupervisor={role === "supervisor"}
      />
    </div>

  )
}
