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
const Album_1 = require("../entity/Album");
function getAlbums(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const album = yield typeorm_1.getRepository(Album_1.Album).find();
        res.json(album);
    });
}
exports.getAlbums = getAlbums;
function getAlbum(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const album = yield typeorm_1.getRepository(Album_1.Album).findOne(req.params.id, { relations: ["photos"] });
        res.json(album);
    });
}
exports.getAlbum = getAlbum;
function addAlbum(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const album = typeorm_1.getRepository(Album_1.Album).create(req.body);
        const results = yield typeorm_1.getRepository(Album_1.Album).save(album);
        return res.json(results);
    });
}
exports.addAlbum = addAlbum;
function updateAlbum(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const album = yield typeorm_1.getRepository(Album_1.Album).findOne(req.params.id, { relations: ["photos"] });
        typeorm_1.getRepository(Album_1.Album).merge(album, req.body);
        const results = yield typeorm_1.getRepository(Album_1.Album).save(album);
        return res.json(results);
    });
}
exports.updateAlbum = updateAlbum;
function deleteAlbum(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(Album_1.Album).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteAlbum = deleteAlbum;
function getAlbumByUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const album = yield typeorm_1.getRepository(Album_1.Album).find({ where: { authorId: req.params.authorId } });
        return res.json(album);
    });
}
exports.getAlbumByUser = getAlbumByUser;
//# sourceMappingURL=album.js.map