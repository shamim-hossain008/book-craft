import type { IBook } from "@/types/book";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/books" }),

  tagTypes: ["Book"],

  endpoints: (builder) => ({
    getBooks: builder.query<IBook[], void>({
      query: () => "/",
      providesTags: ["Book"],
    }),
    // add new Book
    addBook: builder.mutation<IBook, Partial<IBook>>({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    // edit book
    editBook: builder.mutation<IBook, { id: string; data: Partial<IBook> }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    // Delete book
    deleteBook: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Book"],
      }
    ),
  }),
});

export const {
  useGetBooksQuery,
  useEditBookMutation,
  useDeleteBookMutation,
  useAddBookMutation,
} = bookApi;
