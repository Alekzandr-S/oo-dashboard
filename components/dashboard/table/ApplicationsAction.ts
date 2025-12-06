import { toast } from "sonner"
import {
  markPaymentAsPaid,
  approveApplication,
  rejectApplication,
  getApplicationTableData,
} from "@/lib/mock/data"
import { ApplicationTableRow } from "@/lib/mock/data"

export function useApplicationActions(
  role: "officer" | "supervisor",
  userId: number,
  setLocalData: (rows: ApplicationTableRow[]) => void
) {

  function refresh() {
    setLocalData(getApplicationTableData(role, userId))
  }

  function handlePay(id: number) {
    markPaymentAsPaid(id)
    toast.success("Payment completed successfully")
    refresh()
  }

  function handleApprove(id: number) {
    approveApplication(id)
    toast.success("Application approved")
    refresh()
  }

  function handleReject(id: number) {
    rejectApplication(id)
    toast.error("Application rejected")
    refresh()
  }

  return { handlePay, handleApprove, handleReject }
}
