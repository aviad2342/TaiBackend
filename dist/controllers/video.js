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
const Video_1 = require("../entity/Video");
function getVideos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const videos = yield typeorm_1.getRepository(Video_1.Video).find();
        res.json(videos);
    });
}
exports.getVideos = getVideos;
function getVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield typeorm_1.getRepository(Video_1.Video).findOne(req.params.id);
        res.json(video);
    });
}
exports.getVideo = getVideo;
function addVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = typeorm_1.getRepository(Video_1.Video).create(req.body);
        const result = yield typeorm_1.getRepository(Video_1.Video).save(video);
        return res.json(result);
    });
}
exports.addVideo = addVideo;
function updateVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const video = yield typeorm_1.getRepository(Video_1.Video).findOne(req.params.id);
        typeorm_1.getRepository(Video_1.Video).merge(video, req.body);
        const result = yield typeorm_1.getRepository(Video_1.Video).save(video);
        return res.json(result);
    });
}
exports.updateVideo = updateVideo;
function deleteVideo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield typeorm_1.getRepository(Video_1.Video).delete(req.params.id);
        return res.json(result);
    });
}
exports.deleteVideo = deleteVideo;
//# sourceMappingURL=video.js.map