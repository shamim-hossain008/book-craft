import BorrowBookDialog from "@/components/dialog/BorrowBookDialog";
import DeleteBookDialog from "@/components/dialog/DeleteBookDialog";
import { Button } from "@/components/ui/button";
import { useGetBooksQuery } from "@/redux/api/book/bookApi";
import type { IBook } from "@/types/book";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Books() {
  const { data: books, isLoading } = useGetBooksQuery();
  const navigate = useNavigate();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-full h-full text-blue-500" />
      </div>
    );

  // eid book
  const handleEdit = (id: string) => {
    navigate(`/edit-book/${id}`);
  };

  return (
    <div className="p-4 items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Book List</h2>
      <table className="table-auto w-full border border-gray-600">
        <thead className="text-black bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Genre</th>
            <th className="p-2">ISBN</th>
            <th className="p-2">Copies</th>
            <th className="p-2">Availability</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* books map */}
          {books?.map((book: IBook) => (
            <tr key={book._id} className="border-t border-gray-200">
              <td className="p-2">{book.title}</td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.genre}</td>
              <td className="p-2">{book.isbn}</td>
              <td className="p-2">{book.copies}</td>
              <td className="p-2">
                {book.available ? (
                  <span className="text-green-600 font-medium">Available</span>
                ) : (
                  <span className="text-red-500 font-medium">Unavailable</span>
                )}
              </td>
              <td className="p-2 space-x-2">
                <Button
                  className="hover:bg-gray-500"
                  onClick={() => handleEdit(book._id)}
                  variant="default"
                >
                  Edit
                </Button>

                {/* Alert Dialog */}
                {/* DELETE BUTTON WITH DIALOG */}
                <DeleteBookDialog bookId={book._id}>
                  <Button
                    className="hover:underline hover:bg-red-00"
                    variant="destructive"
                    size="sm"
                  >
                    Delete
                  </Button>
                </DeleteBookDialog>

                <BorrowBookDialog book={book}>
                  <Button
                    className="hover:bg-gray-300"
                    disabled={!book.available}
                    variant={"secondary"}
                  >
                    Borrow
                  </Button>
                </BorrowBookDialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
