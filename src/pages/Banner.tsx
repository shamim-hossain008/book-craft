// src/components/Banner.tsx
import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <div
      className="relative bg-cover bg-center text-white py-24 px-6 rounded-xl shadow-md overflow-hidden object-cover"
      style={{
        backgroundImage:
          "url('https://static.vecteezy.com/system/resources/thumbnails/033/215/181/small/office-desk-with-books-notebooks-and-documents-photo.jpg')",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to BookCraft 📚</h1>
        <p className="text-lg mb-6">
          Manage your books easily — add, borrow, and track your library.
        </p>

        <Button className="text-lg px-6 py-3">Borrows Books</Button>
      </div>
    </div>
  );
}
