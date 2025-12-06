"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ApplicationTableRow } from "@/lib/mock/data"
import { MoreHorizontal, CheckCircle, XCircle, Loader2, CreditCard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function createApplicationColumns(
  role: "officer" | "supervisor",
  onView: (row: ApplicationTableRow) => void,
  actions: {
    handlePay: (id: number) => void
    handleApprove: (id: number) => void
    handleReject: (id: number) => void
  }
): ColumnDef<ApplicationTableRow>[] {

  return [
    {
      accessorKey: "title",
      header: "Application",
      cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
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
      ),
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment",
      cell: ({ row }) => (
        <Badge className={row.original.paymentStatus === "paid" ? "bg-green-500" : "bg-yellow-500 text-black"}>
          {row.original.paymentStatus}
        </Badge>
      ),
    },
    { accessorKey: "date", header: "Date" },
    ...(role === "supervisor" ? [{ accessorKey: "owner", header: "Owner" }] : []),
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          {role === "officer" && row.original.paymentStatus === "pending" && (
            <Button size="sm" variant="outline" onClick={() => actions.handlePay(row.original.id)}>
              <CreditCard size={14}/> Pay
            </Button>
          )}

          {role === "supervisor" && row.original.status === "pending" && (
            <>
              <Button size="sm" className="bg-green-600 text-white" onClick={() => actions.handleApprove(row.original.id)}>Approve</Button>
              <Button size="sm" variant="destructive" onClick={() => actions.handleReject(row.original.id)}>Reject</Button>
            </>
          )}

          {/* <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="icon-sm" variant="outline"><MoreHorizontal/></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
              <DropdownMenuLabel>Application</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => onView(row.original)}>View details</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      ),
    }
  ]
}
