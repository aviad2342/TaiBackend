"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CommentController = require("../controllers/comment");
const router = express_1.Router();
router.get("/comments", CommentController.getComments);
router.get("/comment/:id", CommentController.getComment);
router.get("/comment/comments/:id", CommentController.getArticleComments);
router.get("/comment/authorId/:authorId", CommentController.getCommentByUser);
router.post("/comment", CommentController.addComment);
router.put("/comment/:id", CommentController.updateComment);
router.delete("/comment/:id", CommentController.deleteComment);
// router.delete("/comment/articleId/:articleId", CommentController.deleteComments);
exports.commentRouter = router;
//# sourceMappingURL=comment.js.map