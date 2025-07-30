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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddBookMutation } from "@/redux/api/book/bookApi";
import type { IBookInput } from "@/types/book";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// Genre  Labels
const genreLabels = {
  FICTION: "Fiction",
  NON_FICTION: "Non-Fiction",
  SCIENCE: "Science",
  HISTORY: "History",
  BIOGRAPHY: "Biography",
  FANTASY: "Fantasy",
} as const;

type Genre = keyof typeof genreLabels;

export default function AddBook() {
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const form = useForm<IBookInput>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION" as Genre,
      isbn: "",
      description: "",
      copies: 1,
    },
  });
  const onSubmit: SubmitHandler<IBookInput> = async (values) => {
    try {
      await addBook(values).unwrap();
      toast.success("Book added successfully");
      navigate("/");
    } catch (error) {
      toast.error("Add Book Error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            rules={{ required: "Title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter book title" />
                </FormControl>
                <FormDescription>The full title of the book.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            rules={{ required: "Author is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Author name" />
                </FormControl>
                <FormDescription>
                  Provide the author's full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Genre */}
          <FormField
            control={form.control}
            name="genre"
            rules={{ required: "Genre is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl className="w-full h-auto ">
                    <SelectTrigger>
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(genreLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the category that best fits this book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ISBN */}
          <FormField
            control={form.control}
            name="isbn"
            rules={{
              required: "ISBN is required",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="e.g. 9781234567890" />
                </FormControl>
                <FormDescription>
                  Enter the 13-digit ISBN number.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Short book description" />
                </FormControl>
                <FormDescription>
                  Optional: Brief summary or notes about the book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Copies */}
          <FormField
            control={form.control}
            name="copies"
            rules={{
              required: "Copies are required",
              min: { value: 1, message: "At least 1 copy required" },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormDescription>Number of available copies.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? "Loading..." : "Add Book"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
