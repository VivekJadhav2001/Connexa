import express from "express"
import { createPost, deletePost, getAllPosts, getMyPosts, getReferalPosts, toggleLike, updatePost,createComment } from "../controllers/post.controller.js"
import { authorization } from "../middlewares/authorization.js"

const router = express.Router()


router.post("/createPost",authorization,createPost)
router.get("/my-posts",authorization,getMyPosts)
router.get("/allPosts",authorization,getAllPosts) 
router.delete("/deletePost/:postId",authorization,deletePost)
router.patch("/updatePost/:postId",authorization,updatePost)
router.post("/likePost/:postId",authorization,toggleLike)
// router.post("/unLikePost/:postId",authorization,unLikePost)
router.get("/getReferalPosts",authorization,getReferalPosts)
router.post("/comment/:postId",authorization,createComment)


export default router 