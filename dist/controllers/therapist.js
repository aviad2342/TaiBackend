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
const Therapist_1 = require("../entity/Therapist");
function getTherapists(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapists = yield typeorm_1.getRepository(Therapist_1.Therapist).find();
        res.json(therapists);
    });
}
exports.getTherapists = getTherapists;
function getTherapist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapist = yield typeorm_1.getRepository(Therapist_1.Therapist).findOne(req.params.id);
        res.json(therapist);
    });
}
exports.getTherapist = getTherapist;
function addTherapist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapist = typeorm_1.getRepository(Therapist_1.Therapist).create(req.body);
        therapist.hashPassword();
        const results = yield typeorm_1.getRepository(Therapist_1.Therapist).save(therapist).catch(error => {
            const imagePhat = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addTherapist = addTherapist;
function updateTherapist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapist = yield typeorm_1.getRepository(Therapist_1.Therapist).findOne(req.params.id);
        if (therapist.profilePicture !== req.body.profilePicture) {
            const imagePhat = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Therapist_1.Therapist).merge(therapist, req.body);
        const results = yield typeorm_1.getRepository(Therapist_1.Therapist).save(therapist);
        return res.json(results);
    });
}
exports.updateTherapist = updateTherapist;
function updateTherapistAndProfilePicture(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapist = yield typeorm_1.getRepository(Therapist_1.Therapist).findOne(req.params.id);
        const imagePhat = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        typeorm_1.getRepository(Therapist_1.Therapist).merge(therapist, req.body);
        const results = yield typeorm_1.getRepository(Therapist_1.Therapist).save(therapist);
        return res.json(results);
    });
}
exports.updateTherapistAndProfilePicture = updateTherapistAndProfilePicture;
function deleteTherapist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapist = yield typeorm_1.getRepository(Therapist_1.Therapist).findOne(req.params.id);
        const imagePhat = therapist.profilePicture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(Therapist_1.Therapist).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteTherapist = deleteTherapist;
function getTherapistByMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const therapist = yield typeorm_1.getRepository(Therapist_1.Therapist).findOne({ where: { email: req.params.email } });
        return res.json(therapist);
    });
}
exports.getTherapistByMail = getTherapistByMail;
//# sourceMappingURL=therapist.js.map