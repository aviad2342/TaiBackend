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
const Comment_1 = require("../entity/Comment");
function getComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield typeorm_1.getRepository(Comment_1.Comment).find();
        res.json(comment);
    });
}
exports.getComments = getComments;
function getComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield typeorm_1.getRepository(Comment_1.Comment).findOne(req.params.id);
        res.json(comment);
    });
}
exports.getComment = getComment;
function addComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = typeorm_1.getRepository(Comment_1.Comment).create(req.body);
        const results = yield typeorm_1.getRepository(Comment_1.Comment).save(comment);
        return res.json(results);
    });
}
exports.addComment = addComment;
function updateComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield typeorm_1.getRepository(Comment_1.Comment).findOne(req.params.id);
        typeorm_1.getRepository(Comment_1.Comment).merge(comment, req.body);
        const results = yield typeorm_1.getRepository(Comment_1.Comment).save(comment);
        return res.json(results);
    });
}
exports.updateComment = updateComment;
function deleteComment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(Comment_1.Comment).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteComment = deleteComment;
// export async function deleteComments(req: Request, res: Response): Promise<any> {
//     const results: DeleteResult = await getRepository(Comment).delete({articleId: req.params.articleId});
//     return res.json(results);
// }
function getArticleComments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield typeorm_1.getRepository(Comment_1.Comment).findOne(req.params.id, { relations: ["article"] });
        const comments = yield typeorm_1.getRepository(Comment_1.Comment).find({ where: { article: comment.article }, order: { date: "ASC" } });
        return res.json(comments);
    });
}
exports.getArticleComments = getArticleComments;
function getCommentByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const comment = yield typeorm_1.getRepository(Comment_1.Comment).find({ where: { authorId: req.params.authorId } });
        return res.json(comment);
    });
}
exports.getCommentByUser = getCommentByUser;
//# sourceMappingURL=comment.js.map