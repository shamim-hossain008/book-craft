import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { BookOpenText } from "lucide-react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

export default function Navbar() {
  return (
    <div className="flex justify-center text-center items-center mx-auto p-4">
      <div>
        <Link to="/">
          <BookOpenText />
        </Link>
      </div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavigationMenuLink asChild>
                <Link to="/">All Books</Link>
              </NavigationMenuLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavigationMenuLink asChild>
                <Link to="/add-book">Add Book</Link>
              </NavigationMenuLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>
              <NavigationMenuLink asChild>
                <Link to="/borrow-summary">Borrow Summary</Link>
              </NavigationMenuLink>
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
        {/* ModeToggle-theme */}
        <div className=" ml-10">
          <ModeToggle />
        </div>
      </NavigationMenu>
    </div>
  );
}
