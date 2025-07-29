import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  useEditBookMutation,
  useGetBooksQuery,
} from "@/redux/api/book/bookApi";
import React from "react";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editBook, { isLoading }] = useEditBookMutation();

  const { data: books } = useGetBooksQuery();
  const book = books?.find((book) => book._id === id);
  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      isbn: "",
      copies: 1,
    },
  });
  // Set Default values
  React.useEffect(() => {
    if (book) {
      form.reset({
        title: book.title,
        author: book.author,
        genre: book.genre,
        isbn: book.isbn,
        copies: book.copies,
      });
    }
  }, [book, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await editBook({
        id: id as string,
        data: {
          ...data,
          copies: Number(data.copies),
        },
      }).unwrap();
      toast.success("Book updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("❌Failed to update book");
      console.error(error);
    }
  };

  if (!book)
    return <p className="text-center text-red-400 mt-10">Book not found</p>;

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Book</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Book title" {...field} required />
                </FormControl>
                <FormDescription>
                  This is the name of the book as seen publicly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Author name" {...field} required />
                </FormControl>
                <FormDescription>
                  Enter the full name of the author.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Genre (e.g., Fiction, Sci-Fi)"
                    {...field}
                    required
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="ISBN number" {...field} required />
                </FormControl>
                <FormDescription>
                  International standard book number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Number of copies"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    required
                  />
                </FormControl>
                <FormDescription>
                  Set to 0 to mark the book as Unavailable.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Updating..." : "Update Book"}{" "}
          </Button>
        </form>
      </Form>
    </div>
  );
}
