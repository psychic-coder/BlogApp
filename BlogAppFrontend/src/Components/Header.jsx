import { Button, Navbar, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { useLocation } from "react-router-dom";


function Header() {
    {/*useLocation is used to get the url of the page we're currently in*/}
    const path=useLocation().pathname;
  return (
    <Navbar className="border-b-2">
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Rohit's
        </span>
        Blog
      </Link>
      <form>
        {/*the textinput is from flowbite*/}
        <TextInput
          type="text"
          placeholder="Search.."
          className="hidden lg:inline"
          rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className=" flex gap-2 md:order-2">
        <Button className="w-12,h-10 hidden sm:inline" color="gray" pill>
          <FaMoon />
        </Button>
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue" outline  pill>
            Sign-in
          </Button>
        </Link>
        <Navbar.Toggle/>{/*the navbar contents is from the Navbar.collapse*/}
      </div>
      {/*the navbar is imported from the flowbite*/}
      {/*the options colour shows different , which we're getting with the help of the path variable we have created previously */}
      {/*we're  using the navbar.link as div , because we're unable to access the data*/}
      <Navbar.Collapse>
          <Navbar.Link active={path==="/"} as={'div'}>
            <Link to="/">Home</Link>
          </Navbar.Link >
          <Navbar.Link active={path==="/about"} as={'div'}>
            <Link to="/about">About</Link>
          </Navbar.Link>
          <Navbar.Link active={path==="/projects"} as={'div'}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;