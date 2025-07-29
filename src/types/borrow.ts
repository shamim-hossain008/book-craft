import type { IBook } from "./book";

// Borrow type
export interface IBorrow {
  _id: string;
  book: IBook | string;
  quantity: number;
  dueDate: string;
  createAt?: string;
  updatedAt?: string;
}

// Borrow Form Input

export interface IBorrowInput {
  book: string;
  quantity: number;
  dueDate: string;
}

// Borrow Summary type
export interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
    totalQuantity: number;
  };
}
