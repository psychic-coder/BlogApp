import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import CallToAction from '../Components/CallToAction'
import PostCard from '../Components/PostCard'

function Home() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
      const fetchPosts=async()=>{
        const res=await fetch('/api/post/getposts');
        const data=await res.json();
        setPosts(data.posts);
      }
      fetchPosts();
  },[])

  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
        <h1 className='teext-3xl font-bold lg:text-6xl '>Welcome to my Blog</h1>
        <p className='text-gray-500 text-xs sm:text-sm '>Welcome to my blog app, a dynamic and immersive platform where words come alive, and ideas flourish. Crafted with passion and powered by the robust MERN stack, this blog application is a testament of my knowledge in web development technologies.</p>
        <Link to='/search' className='text-xs sm:text:sm text-teal-500 font-bold hover:underline'>
      View Posts
      </Link>
      </div>
      <div className='p-3 bg-amber-100 dark:bg-slate-700'>
        <CallToAction/>
      </div>

      <div className=' max-w-7xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {posts && posts.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
            <div className='flex flex-wrap gap-4'>
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={'/search'}
              className='text-lg text-teal-500 hover:underline text-center'
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home