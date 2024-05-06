import { Select, TextInput,Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../Components/PostCard";


/*The location.search property is accessing the query string portion of the URL associated with the current location.
For example, if the current URL is http://example.com/page?param1=value1&param2=value2, then location.search would be "?param1=value1&param2=value2", which includes the question mark (?) followed by the query parameters.*/
const Search = () => {
    const navigate=useNavigate();
  const location = useLocation();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  console.log(posts);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromURL = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromURL || categoryFromUrl || sortFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromURL,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      //console.log(searchQuery) its output is -->searchTerm=hola+amigo
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        //console.log(res);
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    //id's are the names of the different input parameter we get from the form
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit=(e)=>{
   e.preventDefault();
   const urlParams= new URLSearchParams(location.search);
   urlParams.set('searchTerm',sidebarData.searchTerm);
   urlParams.set('sort',sidebarData.sort)
   urlParams.set('category',sidebarData.category)
   const searchQuery=urlParams.toString();
   navigate(`/search?${searchQuery}`);

  }

  const handleShowMore=async()=>{
        const numberOfPosts=posts.length;
        const startIndex=numberOfPosts;
        const urlParams= new URLSearchParams(location.search);
        urlParams.set('startIndex',startIndex);
        const searchQuery=urlParams.toString();
        const res=await fetch(`/api/post/getposts?${searchQuery}`);
        if(!res.ok){
            return;
        }
        if(res.ok){
            const data=await res.json();
            setPosts([...posts,...data.posts]);
            if(data.posts.length ===9){
                setShowMore(true);
            }else{
               setShowMore(false); 
            }
        }

  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-8 ">
          <div className=" flex items-center gap-2 ">
            <h1 className="whitespace-nowrap font-semibold">Search Term : </h1>
            <TextInput
              placeholder="Search...."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />   
          </div>
          <div className="flex items-center gap-2 ">
              <label className="whitespace-nowrap font-semibold">Sort :</label>  
              <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
          </div>
          <div className="flex items-center gap-2 ">
              <label className="whitespace-nowrap font-semibold">Category :</label>  
              <Select onChange={handleChange} value={sidebarData.category} id='category'>
                <option value="uncategorized">Uncategorized</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
                <option value="javascript">JavaScript</option>
              </Select>
          </div>
          <Button type='submit' outline gradientDuoTone='purpleToPink'>Apply Filters</Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">Posts Results:</h1>
        <div className="p-2 flex flex-wrap gap-4 ">
            {
                !loading && posts.length===0 && 
                (<p className="text-xl text-gray-500 ">No results found </p>)
            }
            {
               loading && (<p className="text-xl text-gray-500">
                Loading...
               </p>)
            }
            {
                !loading && posts && posts.map((post)=>{
                   return <PostCard key={post._id} post={post}/>
                })}{
                    showMore && 
                    <button onClick={handleShowMore} className="text-teal-500 hover:underline text-lg p-7 w-full">
                            Show More
                    </button>
                }
        </div>
      </div>
    </div>
  );
};

export default Search;
