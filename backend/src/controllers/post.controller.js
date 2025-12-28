import { TYPE_OF_POST } from "../constants.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";

const createPost = async (req, res) => {
    try {
        const {
            contentType,
            content,
            caption,
            type,
            isLikeDisabled,
            isCommentDisabled
        } = req.body;

        if (!contentType || !content || !type) {
            return res.status(400).json({
                success: false,
                message: "Required fields missing",
            });
        }

        const post = await Post.create({
            userId: req.userDecoded.id,
            contentType,
            content,
            caption,
            type,
            isLikeDisabled,
            isCommentDisabled,
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post,
        });

    } catch (error) {
        console.error("Create Post Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

const getMyPosts = async (req, res) => {

    try {
        const userId = req.userDecoded.id

        const allPosts = await Post.find({ userId }).sort({ createdAt: -1 })

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

        const allPosts = await Post.find({})
            .populate("userId", "firstName lastName profilePicture")
            .sort({ createdAt: -1 })
            .limit(20)

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
        const { postId } = req.params
        const userId = req.userDecoded.id

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is required",
            })
        }
        //Check if user is deleting his post or not
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        if (post.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not Allowed to Delete Others Posts",
            })
        }


        const deletedPost = await Post.findByIdAndDelete(postId)

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Post Deleted Successfully",
            data: deletedPost
        })
    } catch (error) {
        console.error("Delete Post Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const updatePost = async (req, res) => {

    try {
        const postId = req.params.postId
        const body = req.body

        if (!postId) {
            res.status(404).json({ success: true, message: "Post Id Is Required" })
            return
        }

        if (Object.keys(body).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Update data is required",
            })
        }
        const postToUpdate = await Post.findByIdAndUpdate(postId, body, { new: true, runValidators: true })

        if (!postToUpdate) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: postToUpdate,
        })


    } catch (error) {
        console.error("Update Post Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

const toggleLike = async (req, res) => {
    try {
        const userId = req.userDecoded.id;
        const postId = req.params.postId;

        const post = await Post.findById(postId);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // IMPORTANT: userId is string in schema
        const alreadyLiked = post.likes.some(
            (like) => like.userId === userId
        );

        if (alreadyLiked) {
            // return res.status(409).json({
            //     success: false,
            //     message: "Post already liked",
            // });

            const newPostLikesData = post.likes.filter((like) => like.userId !== userId)

            post.likes = newPostLikesData

            await post.save()

            return res.status(200).json({
                success: true,
                message: "post disliked successfully",
                likesCount: post.likes.length
            })
        }

        post.likes.push({
            userId: userId,
            userName: `${user.firstName} ${user.lastName}`,
            profilePic: user.profilePic || "",
        });

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post liked",
            likesCount: post.likes.length,
        });
    } catch (error) {
        console.error("Update Post Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


// const unLikePost = async (req, res) => {
//     try {
//         const userId = req.userDecoded.id
//         const postId = req.params.postId

//         const post = await Post.findById(postId)
//         const user = await User.findById(userId)

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" })
//         }

//         if (!post) {
//             return res.status(404).json({ success: false, message: "Post not found" })
//         }

//         const beforeLike = post.likes.length

//         post.likes = post.likes.filter((like) => like.userId !== userId)

//         if (beforeLike === post.likes.length) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Post not liked yet",
//             })
//         }

//         await post.save()

//         res.status(200).json({
//             success: true,
//             message: "Post unliked",
//             likesCount: post.likes.length,
//         })
//     } catch (error) {
//         res.status(500).json({ success: false, message: "Server error" })
//     }
// }

const getReferalPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({ created: -1 })
        console.log(posts, "POSTS")

        if (!posts) {
            return res.status(404).json({ success: true, message: "No Posts Avaliable" })
        }

        const referalPosts = posts.filter((post) => post.type === TYPE_OF_POST.Referral_Post)

        if (!referalPosts) {
            return res.status(404).json({ success: true, message: "No referal posts Avaliable" })
        }

        res.status(200).json({
            success: true,
            message: "Referal Posts",
            data: referalPosts
        })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" })
    }
}

const createComment = async (req, res) => {
    try {
        const userId = req.userDecoded.id;
        const postId = req.params.postId;
        const { comment } = req.body;

        if (!comment) {
            return res.status(400).json({ success: false, message: "Please provide valid comment" });
        }

        if (!userId) {
            return res.status(400).json({ success: false, message: "Please provide user-id" });
        }

        if (!postId) {
            return res.status(400).json({ success: false, message: "Please provide post-id" });
        }

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        if (!post) {
            return res.status(404).json({ success: false, message: "Post Not Found" });
        }

        const commentedTime = new Date();

        post.comments.push({
            profilePic: user.profilePicture || "https://dummyimage.com/100x100/ccc/fff.png",
            userName: user.firstName + " " + user.lastName,
            userId: userId,
            comment: comment,
            createdAt: commentedTime,
        });

        await post.save();

        return res.status(200).json({
            success: true,
            message: "Commented Successfully",
            commentLength: post.comments.length,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server error" });
    }
}

/*
delete comment 
edit comment
*/





export {
    createPost,
    getMyPosts,
    getAllPosts,
    deletePost,
    updatePost,
    toggleLike,
    // unLikePost,
    getReferalPosts,
    createComment
}