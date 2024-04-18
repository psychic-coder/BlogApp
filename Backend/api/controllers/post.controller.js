import Post from "../models/postModel.js";
import errorHandler from "../utils/error.js";

export const create = async (req, res, next) => {
  //console.log(req.user)
  //we are  writing user inplace of body as we are checking the cookie in place of the body section
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, "Please provide all the required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "");

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    //when its 1 mongodb is gonna sort it ascending but if the order is -1 then mongodb in gonna sort it in reverse order
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        //using 'or' we can search in between two items
        //'options '-- i, means lower case and upper case is not important
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { content: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort({
        updatedAt: sortDirection,
      })
      .skip(startIndex)
      .limit(limit);

      const totalPosts=await Post.countDocuments();
      const now=new Date();
      const oneMonthAgo=new Date(
        now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
      );

        //GTE stands for "greater then" 
        const lastMonthPosts=await Post.countDocuments({
            createdAt: {$gte:oneMonthAgo},
        });

        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });

  } catch (error) {
    next(error);
  }
};

export const deletepost=async(req,res,next)=>{
  if(!req.user.isAdmin||req.user.id!==req.params.userId){
    return (next(403,'You are not allowed to delete this posts'));
  }
  try {
    await Post.findByIdAndDelete(req.params.postId);
    res.status(200).json('The post has been deleted');
  } catch (error) {
    next(error)
  }
};