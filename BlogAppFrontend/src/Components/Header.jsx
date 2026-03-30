import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useLocation ,useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";




function Header() {
  const [searchTerm,setSearchTerm]=useState('');
  const navigate=useNavigate();

  const location=useLocation();


  //http://localhost:5173/search?searchTerm=react
  //the below console.log gives us the value of searchTerm which is react 
  //console.log(searchTerm);

  
  useEffect(()=>{
    //location.search-->it gives all the data in the current location fro url
    const urlParams=new URLSearchParams(location.search);
    //from the below line we're are getting hold of the value of the searchterm from the url parameters
    const searchTermFromUrl=urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl)
    }
  },[location.search])

  const dispatch = useDispatch();
  // we are getting hold of the current the user over here
  const { currentUser } = useSelector((state) => state.user);

  //in the below code we're getting hold of the current theme
  //where theme is the name of the themeSlice
  const { theme } = useSelector((state) => state.theme);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams(location.search);
    urlParams.set('searchTerm',searchTerm);
    const searchQuery=urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };


    /*useLocation is used to get the url of the page we're currently in , it gives the url after the part of the local host */
  const path = useLocation().pathname;
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
      <form onSubmit={handleSubmit}>
        {/*the textinput is from flowbite*/}
        <TextInput 
          type="text"
          placeholder="Search.."
          className="hidden lg:inline"
          rightIcon={AiOutlineSearch}
          value={searchTerm}
          onChange={(e)=>{
             setSearchTerm(e.target.value)
          }}
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>
      <div className=" flex gap-2 md:order-2">
        <Button
          className="w-12,h-10 inline"
          color="gray"
          onClick={() => {
            dispatch(toggleTheme());
          }}
          pill
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user" img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm ">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate ">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item
            onClick={handleSignOut}
            >Sign Out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline pill>
              Sign-in
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
        {/*the navbar contents is from the Navbar.collapse*/}
      </div>
      {/*the navbar is imported from the flowbite*/}
      {/*the options colour shows different , which we're getting with the help of the path variable we have created previously */}
      {/*we're  using the navbar.link as div , because we're unable to access the data*/}
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
