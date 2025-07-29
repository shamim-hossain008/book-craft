export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createAt?: string;
  updatedAt?: string;
}

// Book From input
export type IBookInput = Omit<
  IBook,
  "_id" | "available" | "createdAt" | "updatedAt"
>;
