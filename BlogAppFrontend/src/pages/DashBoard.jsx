import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../Components/DashSidebar'
import DashProfile from '../Components/DashProfile'
import DashPosts from '../Components/DashPosts'

function DashBoard() {
  //using the useLocation hook, we can access and utilize the current URL information within your React components
  const location=useLocation()

  // to the know the tab we are currently in
  const [tab,setTab]=useState('')

  //URLSearchParams is a built-in interface in modern browsers that provides a way to easily read and manipulate the query string portion of a URL
  //The location.search property returns a string containing the query parameters of the current URL, including the leading question mark (?)
  //we can use the URLSearchParams constructor to parse this query string into a URLSearchParams object, allowing you to manipulate and access individual query parameters
  useEffect(()=>{
     const urlParams= new URLSearchParams(location.search);
    // console.log(urlParams)

     //from the urlParams we are getting hold of the value of tab from the link'
     //http://localhost:5173/dashboard?tab=profile
     const tabFromUrl=urlParams.get('tab');
     //the console.log will print profile
    // console.log(tabFromUrl)
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  },[location.search])

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56 ">{/*sidebar*/}
          <DashSidebar/>
        </div>
        {/*profile..*/}
        {tab==='profile' && 
        <DashProfile/>}
        {tab==='posts' &&
        <DashPosts/>
        }
    </div>
  )
}

export default DashBoard