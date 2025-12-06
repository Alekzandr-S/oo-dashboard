"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, ArrowDown, ArrowUp } from "lucide-react"

export interface ApplicationsToolbarProps {
  onSearch: (value: string) => void
  onFilterStatus: (value: string) => void
  onFilterPayment: (value: string) => void
  onSort: (key: "title" | "date", direction: "asc" | "desc") => void
}

export default function ApplicationsToolbar({
  onSearch,
  onFilterStatus,
  onFilterPayment,
  onSort,
}: ApplicationsToolbarProps) {
  const [search, setSearch] = useState("")

  return (
    <div className="flex flex-wrap gap-3 items-center justify-between mb-4">

      {/* Search Input */}
      <Input
        placeholder="Search applications..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          onSearch(e.target.value)
        }}
        className="w-full sm:w-64"
      />

      <div className="flex flex-wrap gap-2 items-center">

        {/* Status Filter */}
        <Select defaultValue="all" onValueChange={onFilterStatus}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment Filter */}
        <Select defaultValue="all" onValueChange={onFilterPayment}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Payment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort dropdown buttons */}
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={() => onSort("title", "asc")}>
            A-Z <ArrowUp size={14} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSort("title", "desc")}>
            Z-A <ArrowDown size={14} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSort("date", "asc")}>
            Date <ArrowUp size={14} />
          </Button>
          <Button variant="outline" size="sm" onClick={() => onSort("date", "desc")}>
            Date <ArrowDown size={14} />
          </Button>
        </div>

      </div>
    </div>
  )
}
