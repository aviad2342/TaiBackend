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
const Photo_1 = require("../entity/Photo");
function getPhotos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = yield typeorm_1.getRepository(Photo_1.Photo).find();
        res.json(photo);
    });
}
exports.getPhotos = getPhotos;
function getPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = yield typeorm_1.getRepository(Photo_1.Photo).findOne(req.params.id);
        res.json(photo);
    });
}
exports.getPhoto = getPhoto;
function addPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = typeorm_1.getRepository(Photo_1.Photo).create(req.body);
        const results = yield typeorm_1.getRepository(Photo_1.Photo).save(photo);
        return res.json(results);
    });
}
exports.addPhoto = addPhoto;
function updatePhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = yield typeorm_1.getRepository(Photo_1.Photo).findOne(req.params.id, { relations: ["album"] });
        typeorm_1.getRepository(Photo_1.Photo).merge(photo, req.body);
        const results = yield typeorm_1.getRepository(Photo_1.Photo).save(photo);
        return res.json(results);
    });
}
exports.updatePhoto = updatePhoto;
function deletePhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(Photo_1.Photo).delete(req.params.id);
        return res.json(results);
    });
}
exports.deletePhoto = deletePhoto;
function getPhotoAlbum(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = yield typeorm_1.getRepository(Photo_1.Photo).findOne(req.params.id, { relations: ["album"] });
        res.json(photo.album);
    });
}
exports.getPhotoAlbum = getPhotoAlbum;
function getAlbumPhotos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const photo = yield typeorm_1.getRepository(Photo_1.Photo).findOne(req.params.id, { relations: ["album"] });
        const photos = yield typeorm_1.getRepository(Photo_1.Photo).find({ where: { album: photo.album } });
        return res.json(photos);
    });
}
exports.getAlbumPhotos = getAlbumPhotos;
//# sourceMappingURL=photo.js.map