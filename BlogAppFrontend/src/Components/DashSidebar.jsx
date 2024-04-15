import { Sidebar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

function DashSidebar() {
  const location = useLocation();

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

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
            {/*we changed the sidebar.item to div as both sidebar.item and link are anchor tag*/}
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUser}
            label={"User"}
            labelColor="dark"
            as='div'
          >
            <Link to="/dashboard?tab=profile">Profile</Link>
          </Sidebar.Item>

          <Sidebar.Item icon={HiArrowSmRight} className="cursor-pointer">
            SignOut
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}

export default DashSidebar;
