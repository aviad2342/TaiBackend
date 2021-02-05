"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Article_1 = require("../entity/Article");
const fs = require("fs");
const Item_1 = require("../entity/Item");
function getArticles(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield typeorm_1.getRepository(Article_1.Article).find();
        res.json(article);
    });
}
exports.getArticles = getArticles;
function getArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield typeorm_1.getRepository(Article_1.Article).findOne(req.params.id, { relations: ["comments"] });
        res.json(article);
    });
}
exports.getArticle = getArticle;
function viewArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield typeorm_1.getRepository(Article_1.Article).findOne(req.params.id, { relations: ["comments"] });
        article.views++;
        yield typeorm_1.getRepository(Article_1.Article).save(article);
        res.json(article);
    });
}
exports.viewArticle = viewArticle;
function addArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = typeorm_1.getRepository(Article_1.Article).create(req.body);
        const results = yield typeorm_1.getRepository(Article_1.Article).save(article).catch(error => {
            const imagePhat = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            const pdfPhat = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
            if (fs.existsSync(pdfPhat)) {
                fs.unlinkSync(pdfPhat);
            }
        });
        return res.json(results);
    });
}
exports.addArticle = addArticle;
function updateArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield typeorm_1.getRepository(Article_1.Article).findOne(req.params.id);
        if (article.thumbnail !== req.body.thumbnail) {
            const imagePhat = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        if (article.pdf !== req.body.pdf) {
            const pdfPhat = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(pdfPhat)) {
                fs.unlinkSync(pdfPhat);
            }
        }
        let results;
        try {
            typeorm_1.getRepository(Article_1.Article).merge(article, req.body);
            results = yield typeorm_1.getRepository(Article_1.Article).save(article);
        }
        catch (error) {
            const imagePhat = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            const pdfPhat = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
            if (fs.existsSync(pdfPhat)) {
                fs.unlinkSync(pdfPhat);
            }
        }
        return res.json(results);
    });
}
exports.updateArticle = updateArticle;
function addArticlePdf(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/articles/" + req.file.filename;
        return res.json({ fileUrl: url });
    });
}
exports.addArticlePdf = addArticlePdf;
function deleteArticle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield typeorm_1.getRepository(Article_1.Article).findOne(req.params.id);
        const imagePhat = article.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        const pdfPhat = article.pdf.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        if (fs.existsSync(pdfPhat)) {
            fs.unlinkSync(pdfPhat);
        }
        const item = yield typeorm_1.getRepository(Item_1.Item).findOne({ where: { productId: article.id } });
        if (item) {
            yield typeorm_1.getRepository(Item_1.Item).delete(item.id);
        }
        const results = yield typeorm_1.getRepository(Article_1.Article).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteArticle = deleteArticle;
function getArticleByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const article = yield typeorm_1.getRepository(Article_1.Article).find({ where: { authorId: req.params.authorId } });
        return res.json(article);
    });
}
exports.getArticleByUser = getArticleByUser;
//# sourceMappingURL=article.js.map