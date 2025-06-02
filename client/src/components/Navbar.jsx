import { Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import DarkMode from "@/DarkMode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { SearchOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const logoutHandler = async () => {
    await logoutUser();
    setIsMenuOpen(false);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User log out.");
      navigate("/login");
    }
  }, [isSuccess, data, navigate]);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="h-16 dark:bg-[#00000] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-6 h-full px-4">
        <div className="flex items-center gap-4">
          <Link to="/">
            <h1 className="font-bold text-2xl text-[#6D28D2]">E-Course</h1>
          </Link>

          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white dark:bg-white-800 rounded-full shadow-md overflow-hidden w-[400px]"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-none focus-visible:ring-0 px-4 py-2 text-black placeholder-gray-400 bg-white"
            />
            <Button
              type="submit"
              className="bg-[#6D28D2] text-white px-4 py-2 hover:bg-[#6D28D9]-700 rounded-none rounded-r-full"
            >
              <SearchOutlined />
            </Button>
          </form>

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white text-[#2A2B3F]-600 dark:text-[#2A2B3F] hover:bg-gray-200 rounded-full px-4 py-2"
          >
            Explore Courses
          </Button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <Avatar
                    size={32}
                    // src={user?.photoUrl}
                    icon={<UserOutlined />}
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleMenuItemClick}>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleMenuItemClick}>
                    <Link to="profile">Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleMenuItemClick}>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              className="bg-[#6D28D2] hover:bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Login | Signup
            </Button>
          )}
          <DarkMode />
        </div>
      </div>

      {/* Mobile */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to="/">
          <h1 className="font-bold text-2xl text-[#6D28D2]">E-Course</h1>
        </Link>
        <MobileNavbar
          user={user}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchHandler={searchHandler}
        />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, searchQuery, setSearchQuery, searchHandler }) => {
  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            <Link to="/">E-Course</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4 mt-4">
          <form
            onSubmit={searchHandler}
            className="flex items-center bg-white rounded-full shadow-md overflow-hidden"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-none focus-visible:ring-0 px-4 py-2 text-black placeholder-gray-400 bg-white"
            />
            <Button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 rounded-none rounded-r-full"
            >
              <SearchOutlined />
            </Button>
          </form>

          <Button
            onClick={() => navigate(`/course/search?query`)}
            className="bg-white text-blue-600 hover:bg-gray-200 rounded-full px-4 py-2"
          >
            Explore Courses
          </Button>

          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p onClick={() => navigate("/login") } className="cursor-pointer">Log out</p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
