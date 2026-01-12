import { TYPE_OF_POST } from "../constants.js";
import { Post } from "../models/post.model.js";
import { Like } from "../models/likes.model.js"
import { Comment } from "../models/comments.model.js"

const createPost = async (req, res) => {
    try {
        const { postCategory, contentType, content, caption, referralDetails, visibility } = req.body;

        // Parse referral details if it's JSON string
        const parsedReferral = postCategory === "referral" && referralDetails
            ? JSON.parse(referralDetails)
            : undefined;

        if (!postCategory || !contentType || !content) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        const post = await Post.create({
            author: req.userDecoded.id,
            postCategory,
            contentType,
            content,
            caption,
            referralDetails: parsedReferral,
            visibility,
            media: req.files, // array of uploaded files
        });

        res.status(201).json({ success: true, message: "Post created successfully", data: post });
    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};



const getMyPosts = async (req, res) => {

    try {
        const userId = req.userDecoded.id

        const allPosts = await Post.find({ author: userId }).sort({ createdAt: -1 })

        if (!allPosts) {
            res.status(404).json({
                success: false,
                message: "No Posts Found"
            })
            return
        }

        res.status(200).json({
            success: true,
            message: "ok",
            data: allPosts
        })

    } catch (error) {
        console.error("Get All Post Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const getAllPosts = async (req, res) => {
    try {

        const allPosts = await Post.find()
            .populate("author", "firstName lastName profilePicture")
            .populate("likes.user", "firstName lastName profilePicture")
            .populate("comments.user", "firstName lastName profilePicture")
            .sort({ createdAt: -1 });

        console.log(allPosts, "ALL POSTS")

        res.status(200).json({
            success: true,
            message: "ok",
            data: allPosts,
        })


    } catch (error) {
        console.error("Get Feed Posts Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userDecoded.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }


        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to delete others' posts",
            });
        }

        await Post.findByIdAndDelete(postId);

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.userDecoded.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // ownership check
        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to update others' posts",
            });
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const toggleLike = async (req,res)=>{
  const userId = req.userDecoded.id;
  const postId = req.params.postId;

  const post = await Post.findById(postId);
  if(!post) return res.status(404).json({message:"Post not found"});

  const alreadyLiked = post.likes.find(
    l => l.user.toString() === userId
  );

  if(alreadyLiked){
    post.likes = post.likes.filter(
      l => l.user.toString() !== userId
    );
    post.likesCount -= 1;
    await post.save();

    return res.json({ success:true, message:"Unliked" });
  }

  post.likes.push({ user: userId });
  post.likesCount += 1;
  await post.save();

  res.json({ success:true, message:"Liked" });
}



const getReferalPosts = async (req, res) => {
    try {
        const referralPosts = await Post.find({
            postCategory: "referral",
        })
            .populate("author", "firstName lastName profilePicture")
            .sort({ createdAt: -1 });

        if (!referralPosts.length) {
            return res.status(404).json({
                success: false,
                message: "No referral posts available",
            });
        }

        res.status(200).json({
            success: true,
            message: "Referral posts",
            data: referralPosts,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const createComment = async (req,res)=>{
  const userId = req.userDecoded.id;
  const postId = req.params.postId;
  const { comment } = req.body;

  const post = await Post.findById(postId);
  if(!post) return res.status(404).json({message:"Post not found"});

  post.comments.push({ user: userId, comment });
  post.commentsCount += 1;
  await post.save();

  res.json({ success:true, message:"Comment added" });
}



const deleteComment = async (req, res) => {
    try {
        const userId = req.userDecoded.id;
        const { commentId } = req.params;

        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        if (comment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this comment",
            });
        }

        await Comment.findByIdAndDelete(commentId);

        await Post.findByIdAndUpdate(comment.postId, {
            $inc: { commentsCount: -1 },
        });

        res.status(200).json({
            success: true,
            message: "Comment deleted",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
        });
    }
};


const editComment = async (req, res) => {
    try {
        const userId = req.userDecoded.id;
        const { commentId } = req.params;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "Updated comment text is required",
            });
        }

        const existingComment = await Comment.findById(commentId);
        if (!existingComment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        if (existingComment.userId.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to edit this comment",
            });
        }

        existingComment.comment = comment;
        await existingComment.save();

        res.status(200).json({
            success: true,
            message: "Comment updated",
            data: existingComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server error",
        });
    }
};

const getAllCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            });
        }

        const comments = await Comment.find({ postId })
            .populate("userId", "firstName lastName profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            data: comments,
        });

    } catch (error) {
        console.error("Get Comments Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


/*
Reply to a comment
*/





export {
    createPost,
    getMyPosts,
    getAllPosts,
    deletePost,
    updatePost,
    toggleLike,
    getReferalPosts,
    createComment,
    deleteComment,
    editComment,
    getAllCommentsByPost
}