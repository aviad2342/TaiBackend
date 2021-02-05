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
const Treatment_1 = require("../entity/Treatment");
const Item_1 = require("../entity/Item");
function getTreatments(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatments = yield typeorm_1.getRepository(Treatment_1.Treatment).find();
        res.json(treatments);
    });
}
exports.getTreatments = getTreatments;
function getTreatmentsByType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatments = yield typeorm_1.getRepository(Treatment_1.Treatment).find({ where: { treatmentType: req.params.treatmentType } });
        res.json(treatments);
    });
}
exports.getTreatmentsByType = getTreatmentsByType;
function getTreatment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatment = yield typeorm_1.getRepository(Treatment_1.Treatment).findOne(req.params.id);
        res.json(treatment);
    });
}
exports.getTreatment = getTreatment;
function addTreatment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatment = typeorm_1.getRepository(Treatment_1.Treatment).create(req.body);
        const results = yield typeorm_1.getRepository(Treatment_1.Treatment).save(treatment).catch(error => {
            const imagePhat = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addTreatment = addTreatment;
function updateTreatment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatment = yield typeorm_1.getRepository(Treatment_1.Treatment).findOne(req.params.id);
        if (treatment.thumbnail !== req.body.thumbnail) {
            const imagePhat = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Treatment_1.Treatment).merge(treatment, req.body);
        const results = yield typeorm_1.getRepository(Treatment_1.Treatment).save(treatment);
        return res.json(results);
    });
}
exports.updateTreatment = updateTreatment;
function deleteTreatment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatment = yield typeorm_1.getRepository(Treatment_1.Treatment).findOne(req.params.id);
        const imagePhat = treatment.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const item = yield typeorm_1.getRepository(Item_1.Item).findOne({ where: { productId: treatment.id } });
        if (item) {
            yield typeorm_1.getRepository(Item_1.Item).delete(item.id);
        }
        const results = yield typeorm_1.getRepository(Treatment_1.Treatment).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteTreatment = deleteTreatment;
function getTreatmentsByTherapist(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const treatments = yield typeorm_1.getRepository(Treatment_1.Treatment).find({ where: { therapistId: req.params.therapistId } });
        return res.json(treatments);
    });
}
exports.getTreatmentsByTherapist = getTreatmentsByTherapist;
//# sourceMappingURL=treatment.js.map