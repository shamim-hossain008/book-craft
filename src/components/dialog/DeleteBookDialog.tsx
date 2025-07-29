import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useDeleteBookMutation } from "@/redux/api/book/bookApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

interface DeleteBookDialogProps {
  children: React.ReactNode;
  bookId: string;
}

export default function DeleteBookDialog({
  children,
  bookId,
}: DeleteBookDialogProps) {
  const [deleteBook] = useDeleteBookMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteBook(bookId).unwrap();
      toast.success(res.message || "Book deleted successfully");
    } catch (error) {
      const err = error as FetchBaseQueryError & {
        data?: { message?: string };
      };
      const message = err?.data?.message || "Failed to delete book";
      toast.error(message);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this book?
          </AlertDialogTitle>
          <AlertDialogDescription>
            It will permanently remove the book from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
