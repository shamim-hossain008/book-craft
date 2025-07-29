import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetBooksQuery } from "@/redux/api/book/bookApi";
import { useCreateBorrowMutation } from "@/redux/api/book/borrowApi";
import type { IBook } from "@/types/book";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface BorrowBookDialogProps {
  children: React.ReactNode;
  book: IBook;
}

export default function BorrowBookDialog({
  children,
  book,
}: BorrowBookDialogProps) {
  const today = new Date().toISOString().split("T")[0];
  const [dueDate, setDueDate] = useState(today);
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [createBorrow, { isLoading }] = useCreateBorrowMutation();
  const { refetch } = useGetBooksQuery();
  const navigate = useNavigate();

  const resetForm = () => {
    setQuantity(1);
    setDueDate("");
  };

  const handleBorrow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > book.copies) {
      toast(`⚠️You can't borrow more then ${book.copies} copies.`);
      return;
    }

    try {
      await createBorrow({ book: book._id, quantity, dueDate }).unwrap();
      await refetch();
      toast.success(
        <div className="text-green-600 font-bold">
          ✅ Book borrowed successfully
        </div>
      );
      resetForm();
      setOpen(false);
      navigate("/borrow-summary");
    } catch (error) {
      toast.error(<p className="text-red-500">Failed to borrow book</p>);
      console.error(error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        setOpen(state);
        if (!state) resetForm();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow "{book.title}"</DialogTitle>
          <DialogDescription>
            Please enter the quantity and select a due date to borrow the book.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBorrow} className="space-y-6">
          <div>
            <Label className="p-2">Quantity</Label>
            <Input
              type="number"
              min={1}
              max={book.copies}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <Label className="p-2">Due-Date</Label>
            <Input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              min={today}
            />
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-blue-500" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
