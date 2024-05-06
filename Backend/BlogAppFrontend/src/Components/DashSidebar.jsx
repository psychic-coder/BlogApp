import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiAnnotation, HiArrowSmRight, HiChartBar, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { signOutSuccess } from "../redux/user/userSlice";



function DashSidebar() {
  const {currentUser}=useSelector(state=>state.user);

  const location = useLocation();
const dispatch =useDispatch()

  // to the know the tab we are currently in
  const [tab, setTab] = useState("");

  //URLSearchParams is a built-in interface in modern browsers that provides a way to easily read and manipulate the query string portion of a URL
  //The location.search property returns a string containing the query parameters of the current URL, including the leading question mark (?)
  //we can use the URLSearchParams constructor to parse this query string into a URLSearchParams object, allowing you to manipulate and access individual query parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams)

    //from the urlParams we are getting hold of the value of tab from the link'
    //http://localhost:5173/dashboard?tab=profile
    const tabFromUrl = urlParams.get("tab");
    //the console.log will print profile
    // console.log(tabFromUrl)
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

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

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1 "> 
            {/*we changed the sidebar.item to div as both sidebar.item and link are anchor tag*/}
            {currentUser && currentUser.isAdmin && 
          <Sidebar.Item
          active={tab === "dash" || !tab }
          icon={HiChartPie}
          as='div'
        >
          <Link to="/dashboard?tab=dash">Dashboard</Link>
        </Sidebar.Item>

          }
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={currentUser.isAdmin?'Admin':'User'}
            labelColor="dark"
            as='div'
          >
            <Link to="/dashboard?tab=profile">Profile</Link>
          </Sidebar.Item>

          {currentUser.isAdmin && 
          <Sidebar.Item
          active={tab === "posts"}
          icon={HiDocumentText}
          as='div'
        >
          <Link to="/dashboard?tab=posts">Posts</Link>
        </Sidebar.Item>

          }
          {currentUser.isAdmin && 
          
          <Sidebar.Item
          active={tab === "users"}
          icon={HiOutlineUserGroup}
          as='div'
        >
          <Link to="/dashboard?tab=users">Users</Link>
        </Sidebar.Item>

          }
          {currentUser.isAdmin && 
          
          <Sidebar.Item
          active={tab === "comments"}
          icon={HiAnnotation}
          as='div'
        >
          <Link to="/dashboard?tab=comments">Comments</Link>
        </Sidebar.Item>

          }
          
          <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut} className="cursor-pointer">
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
