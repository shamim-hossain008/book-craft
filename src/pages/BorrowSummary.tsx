import { useGetBorrowSummaryQuery } from "@/redux/api/book/borrowApi";
import type { IBorrowSummary } from "@/types/borrow";
import { Loader2 } from "lucide-react";

export default function BorrowSummary() {
  const { data: summary, isLoading } = useGetBorrowSummaryQuery();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="animate-spin w-full h-full text-blue-500" />
      </div>
    );

  return (
    <div className="p-4 items-center text-center">
      <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>

      <table className="table-auto w-1/2 h-full border border-gray-600 items-center text-center mx-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Title</th>
            <th className="p-2">ISBN</th>
            <th className="p-2">Total Borrowed</th>
          </tr>
        </thead>
        <tbody>
          {summary?.map((item: IBorrowSummary, index) => (
            <tr
              key={item.book.isbn || index}
              className="border-t border-gray-200"
            >
              <td>{item.book.title}</td>
              <td>{item.book.isbn}</td>
              <td>{item.book.totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
