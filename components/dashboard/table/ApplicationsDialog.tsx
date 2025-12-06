"use client"

import { ApplicationTableRow } from "@/lib/mock/data"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Props {
  selected: ApplicationTableRow | null
  open: boolean
  onOpenChange: (v: boolean) => void
  isSupervisor: boolean
}

export default function ApplicationsDialog({ selected, open, onOpenChange, isSupervisor }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{selected?.title ?? "Application details"}</DialogTitle>
          <DialogDescription>Key information about this application.</DialogDescription>
        </DialogHeader>

        {selected && (
          <div className="space-y-3 text-sm">
            <Row label="Status" value={selected.status} />
            <Row label="Payment" value={selected.paymentStatus} />
            <Row label="Date" value={selected.date} />
            {isSupervisor && <Row label="Owner" value={selected.owner} />}
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Row({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium capitalize">{value}</span>
    </div>
  )
}
