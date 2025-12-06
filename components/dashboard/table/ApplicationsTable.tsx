"use client"

import { ColumnDef, flexRender } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ApplicationTableRow, approveApplication, getApplicationTableData, markPaymentAsPaid, rejectApplication } from "@/lib/mock/data"
import { useCurrentUser } from "@/components/providers/UserProvider"
import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { MoreHorizontal, CheckCircle, XCircle, Loader2, CreditCard } from "lucide-react"
import { toast } from "sonner"
import { useState } from "react"
import {Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ApplicationsTable() {
  const [selected, setSelected] = useState<ApplicationTableRow | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const { user } = useCurrentUser()
  if (!user) return null

  // function openDrawer(row: ApplicationTableRow) {
  //   setSelected(row)
  //   setDrawerOpen(true)
  // }

  function handlePay(id: number) {
    markPaymentAsPaid(id)
    toast.success("Payment completed successfully!")
    refreshTable();
  }

  function handleApprove(id: number) {
    approveApplication(id)
    toast.success("Payment completed successfully!")
    refreshTable();
  }

  function handleReject(id: number) {
    rejectApplication(id)
    toast.success("Payment completed successfully!")
    refreshTable();
  }

  function refreshTable() {
    setLocalData([...getApplicationTableData(user?.role, user?.id)]);
  }


  const [localData, setLocalData] = useState(
    getApplicationTableData(user.role, user.id)
  )
  
  const columns: ColumnDef<typeof localData[number]>[] = [
    {
      accessorKey: "title",
      header: "Application",
      cell: ({ row }) => <span className="font-medium">{row.original.title}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant="outline" className="flex gap-1 items-center">
          {row.original.status === "approved" && <CheckCircle size={14} className="text-green-500"/>}
          {row.original.status === "pending" && <Loader2 size={14} className="text-yellow-500 animate-spin" />}
          {row.original.status === "rejected" && <XCircle size={14} className="text-red-500"/>}
          {row.original.status}
        </Badge>
      )
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => (
        <Badge 
          className={row.original.paymentStatus === "paid" ? "bg-green-500" : "bg-yellow-500 text-black"}>
          {row.original.paymentStatus}
        </Badge>
      )
    },
    {
      accessorKey: "date",
      header: "Date",
    },
    ...(user.role === "supervisor" ? [{
      accessorKey: "owner",
      header: "Owner",
    }] : []),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {(user.role === "officer" && row.original.paymentStatus === "pending") && (
            <Button  size="sm" variant="outline" className="flex gap-1"
              onClick={() => handlePay(row.original.id)}
            >
              <CreditCard size={14}/>
              Pay
            </Button>
          )}

          {(user.role === "supervisor" && row.original.status === "pending") && (
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleApprove(row.original.id)}
            >
              Approve
            </Button>
          )}
          {(user.role === "supervisor" && row.original.status === "pending") && (
            <Button size="sm" variant="destructive"
              onClick={() => handleReject(row.original.id)}
            >
              Reject
            </Button>
          )}

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Open menu"
              >
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>Application</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault()
                    setSelected(row.original)
                    setDetailOpen(true)
                  }}
                >
                  View details
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    }
  ]
  const table = useReactTable({ data: localData, columns, getCoreRowModel: getCoreRowModel() })
  

  return (
    <div 
      className="rounded-xl border mt-6 px-4 lg:px-6 overflow-hidden"
    >
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map(hg => (
            <TableRow key={hg.id}>
              {hg.headers.map(h => (
                <TableHead key={h.id}>{h.column.columnDef.header as string}</TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow 
              key={row.id}
              className="cursor-pointer hover:bg-muted/50"
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}

                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>
              {selected?.title ?? "Application details"}
            </DialogTitle>
            <DialogDescription>
              Key information about this application.
            </DialogDescription>
          </DialogHeader>

          {selected && (
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium capitalize">{selected.status}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span className="font-medium capitalize">{selected.paymentStatus}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{selected.date}</span>
              </div>

              {user.role === "supervisor" && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-medium">{selected.owner}</span>
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
