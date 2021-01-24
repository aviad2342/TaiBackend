"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const articleBodyImagesController = require("../controllers/articleBodyImages");
const articleBodyImages_1 = require("../middleware/articleBodyImages");
const router = express_1.Router();
router.post("/", articleBodyImages_1.articleBodyImages, articleBodyImagesController.uploadArticleBodyImage);
exports.articleBodyImagesRouter = router;
//# sourceMappingURL=articleBodyImages.js.map