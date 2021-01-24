import {Router} from "express";

import * as CommentController from "../controllers/comment";


const router: Router = Router();

router.get("/comments", CommentController.getComments);

router.get("/comment/:id", CommentController.getComment);

router.get("/comment/comments/:id", CommentController.getArticleComments);

router.get("/comment/authorId/:authorId", CommentController.getCommentByUser);

router.post("/comment", CommentController.addComment);

router.put("/comment/:id", CommentController.updateComment);

router.delete("/comment/:id", CommentController.deleteComment);

// router.delete("/comment/articleId/:articleId", CommentController.deleteComments);


export const commentRouter: Router = router;