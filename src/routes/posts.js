const express = require("express")
const router = express.Router();
const controller = require("../controllers/posts");

router.get("/", controller.getAllPosts);
router.get("/user-posts", controller.getAllUserPosts);
router.get("/post-details", controller.getPostDetails);
router.post("/new-post", controller.newPost);
router.delete("/post-details/delete", controller.deletePost);
router.put("/post-details/edit", controller.editPost);

router.delete("/test", controller.testDelete)

module.exports = router;