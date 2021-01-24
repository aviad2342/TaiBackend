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
const fs = require("fs");
const Speaker_1 = require("../entity/Speaker");
function getSpeakers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speakers = yield typeorm_1.getRepository(Speaker_1.Speaker).find();
        res.json(speakers);
    });
}
exports.getSpeakers = getSpeakers;
function getSpeaker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speaker = yield typeorm_1.getRepository(Speaker_1.Speaker).findOne(req.params.id);
        res.json(speaker);
    });
}
exports.getSpeaker = getSpeaker;
function addSpeaker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speaker = typeorm_1.getRepository(Speaker_1.Speaker).create(req.body);
        const results = yield typeorm_1.getRepository(Speaker_1.Speaker).save(speaker).catch(error => {
            const imagePhat = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addSpeaker = addSpeaker;
function updateSpeaker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speaker = yield typeorm_1.getRepository(Speaker_1.Speaker).findOne(req.params.id);
        if (speaker.picture !== req.body.thumbnail) {
            const imagePhat = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Speaker_1.Speaker).merge(speaker, req.body);
        const results = yield typeorm_1.getRepository(Speaker_1.Speaker).save(speaker);
        return res.json(results);
    });
}
exports.updateSpeaker = updateSpeaker;
function updateSpeakerAndImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speaker = yield typeorm_1.getRepository(Speaker_1.Speaker).findOne(req.params.id);
        const imagePhat = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        typeorm_1.getRepository(Speaker_1.Speaker).merge(speaker, req.body);
        const results = yield typeorm_1.getRepository(Speaker_1.Speaker).save(speaker);
        return res.json(results);
    });
}
exports.updateSpeakerAndImage = updateSpeakerAndImage;
function deleteSpeaker(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speaker = yield typeorm_1.getRepository(Speaker_1.Speaker).findOne(req.params.id);
        const imagePhat = speaker.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(Speaker_1.Speaker).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteSpeaker = deleteSpeaker;
function getSpeakereByEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const speakers = yield typeorm_1.getRepository(Speaker_1.Speaker).find({ where: { eventId: req.params.eventId } });
        return res.json(speakers);
    });
}
exports.getSpeakereByEvent = getSpeakereByEvent;
//# sourceMappingURL=speaker.js.map