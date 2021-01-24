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
const fs = require("fs");
function uploadImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadImage = uploadImage;
function uploadUserImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/userImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadUserImage = uploadUserImage;
function uploadTherapistImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/therapistImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadTherapistImage = uploadTherapistImage;
function uploadTreatmentImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/treatmentImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadTreatmentImage = uploadTreatmentImage;
function uploadSpeakerImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/speakerImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadSpeakerImage = uploadSpeakerImage;
function uploadParticipantImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/participantImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadParticipantImage = uploadParticipantImage;
function uploadEventImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/eventImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadEventImage = uploadEventImage;
function uploadEventPictures(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = Object.values(req.files);
        // const url: string = req.protocol + "://" + req.get("host") + "/eventImages/";
        const urls = [];
        files.forEach(file => {
            urls.push(file.originalname);
        });
        return res.json(urls);
    });
}
exports.uploadEventPictures = uploadEventPictures;
function uploadArticleImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/articleImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadArticleImage = uploadArticleImage;
function uploadItemImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/itemImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadItemImage = uploadItemImage;
function uploadArticleBodyImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/articleImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadArticleBodyImage = uploadArticleBodyImage;
function uploadCourseImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = req.protocol + "://" + req.get("host") + "/courseImages/" + req.file.filename;
        return res.json({ imageUrl: url });
    });
}
exports.uploadCourseImage = uploadCourseImage;
function deleteEventImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (fs.existsSync("./src/eventImages/" + req.params.name)) {
            fs.unlinkSync("./src/eventImages/" + req.params.name);
            return res.json({ response: "התמונה הוסרה בהצלחה" });
        }
        return res.json({ response: "הסרת התמונה נכשלה!" });
    });
}
exports.deleteEventImage = deleteEventImage;
function deleteImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const imagePhat = req.query.image.toString().replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
            return res.json({ response: "התמונה הוסרה בהצלחה" });
        }
        return res.json({ response: "הסרת התמונה נכשלה!" });
    });
}
exports.deleteImage = deleteImage;
function getImage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.query.image);
        const imagePhat = req.query.image.toString().replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            return res.send(fs.readFileSync(imagePhat));
        }
        return res.json({ response: "הסרת התמונה נכשלה!" });
    });
}
exports.getImage = getImage;
//# sourceMappingURL=upload.js.map