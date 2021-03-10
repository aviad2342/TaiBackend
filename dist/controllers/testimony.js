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
const Testimony_1 = require("../entity/Testimony");
function getTestimonies(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testimonies = yield typeorm_1.getRepository(Testimony_1.Testimony).find();
        res.json(testimonies);
    });
}
exports.getTestimonies = getTestimonies;
function getTestimony(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testimony = yield typeorm_1.getRepository(Testimony_1.Testimony).findOne(req.params.id);
        res.json(testimony);
    });
}
exports.getTestimony = getTestimony;
function addTestimony(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testimony = typeorm_1.getRepository(Testimony_1.Testimony).create(req.body);
        const results = yield typeorm_1.getRepository(Testimony_1.Testimony).save(testimony).catch(error => {
            const imagePhat = testimony.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat) && !imagePhat.includes('/images/')) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addTestimony = addTestimony;
function updateTestimony(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testimony = yield typeorm_1.getRepository(Testimony_1.Testimony).findOne(req.params.id);
        if (testimony.picture !== req.body.picture) {
            const imagePhat = testimony.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat) && !imagePhat.includes('/images/')) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(Testimony_1.Testimony).merge(testimony, req.body);
        const results = yield typeorm_1.getRepository(Testimony_1.Testimony).save(testimony);
        return res.json(results);
    });
}
exports.updateTestimony = updateTestimony;
function deleteTestimony(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const testimony = yield typeorm_1.getRepository(Testimony_1.Testimony).findOne(req.params.id);
        const imagePhat = testimony.picture.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat) && !imagePhat.includes('/images/')) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_1.getRepository(Testimony_1.Testimony).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteTestimony = deleteTestimony;
//# sourceMappingURL=testimony.js.map