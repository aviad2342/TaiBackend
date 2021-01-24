import {Router} from "express";

import * as ArticleController from "../controllers/article";
import { articlePdf } from "../middleware/articlePdf";


const router: Router = Router();

router.get("/articles", ArticleController.getArticles);

router.get("/article/:id", ArticleController.getArticle);

router.get("/view/:id", ArticleController.viewArticle);

router.get("/article/authorId/:authorId", ArticleController.getArticleByUser);

router.post("/article", ArticleController.addArticle);

router.post("/article/pdf", articlePdf, ArticleController.addArticlePdf);

router.put("/article/:id", ArticleController.updateArticle);

router.delete("/article/:id", ArticleController.deleteArticle);


export const articleRouter: Router = router;