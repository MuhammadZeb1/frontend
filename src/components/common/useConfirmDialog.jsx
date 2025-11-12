import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog"
import { Button } from "../ui/button"

/**
 * ✅ Reusable ShadCN Confirm Dialog
 * 
 * Usage Example:
 * const { ConfirmDialog, confirm } = useConfirmDialog();
 * 
 * const handleDelete = async () => {
 *   const ok = await confirm("Delete Item", "Are you sure you want to delete this?");
 *   if (ok) {
 *     await axios.delete("/api/item");
 *   }
 * };
 * 
 * return (
 *   <>
 *     <button onClick={handleDelete}>Delete</button>
 *     {ConfirmDialog}
 *   </>
 * );
 */

export function useConfirmDialog() {
  const [open, setOpen] = useState(false)
  const [resolver, setResolver] = useState(null)
  const [content, setContent] = useState({ title: "", description: "", confirmText: "Delete", cancelText: "Cancel" })

  // 🧠 Call this function from anywhere
  const confirm = (title, description, confirmText = "Delete", cancelText = "Cancel") => {
    setContent({ title, description, confirmText, cancelText })
    setOpen(true)
    return new Promise((resolve) => setResolver(() => resolve))
  }

  const handleConfirm = () => {
    setOpen(false)
    resolver(true)
  }

  const handleCancel = () => {
    setOpen(false)
    resolver(false)
  }

  const ConfirmDialog = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{content.title || "Are you sure?"}</DialogTitle>
          <DialogDescription>{content.description || "This action cannot be undone."}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            {content.cancelText}
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            {content.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return { ConfirmDialog, confirm }
}
