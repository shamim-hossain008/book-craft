import type { IBorrow, IBorrowInput, IBorrowSummary } from "@/types/borrow";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.BORROW_API_BASE_URL;

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Borrow", "Book"],
  endpoints: (builder) => ({
    createBorrow: builder.mutation<
      { message: boolean; borrow: IBorrow },
      IBorrowInput
    >({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Borrow", "Book"],
    }),
    // Borrow Summary
    getBorrowSummary: builder.query<IBorrowSummary[], void>({
      query: () => "/summary",
      transformResponse: (response: {
        message: string;
        data: IBorrowSummary[];
      }) => response.data,
      providesTags: ["Borrow"],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;
