"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticleController = require("../controllers/article");
const articlePdf_1 = require("../middleware/articlePdf");
const router = express_1.Router();
router.get("/articles", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.get("/view/:id", ArticleController.viewArticle);
router.get("/article/authorId/:authorId", ArticleController.getArticleByUser);
router.post("/article", ArticleController.addArticle);
router.post("/article/pdf", articlePdf_1.articlePdf, ArticleController.addArticlePdf);
router.put("/article/:id", ArticleController.updateArticle);
router.delete("/article/:id", ArticleController.deleteArticle);
exports.articleRouter = router;
//# sourceMappingURL=article.js.map