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
const Update_1 = require("../entity/Update");
function getUpdates(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const updates = yield typeorm_1.getRepository(Update_1.Update).find();
        res.json(updates);
    });
}
exports.getUpdates = getUpdates;
function getUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield typeorm_1.getRepository(Update_1.Update).findOne(req.params.id);
        res.json(update);
    });
}
exports.getUpdate = getUpdate;
function addUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = typeorm_1.getRepository(Update_1.Update).create(req.body);
        const result = yield typeorm_1.getRepository(Update_1.Update).save(update);
        return res.json(result);
    });
}
exports.addUpdate = addUpdate;
function updateUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = yield typeorm_1.getRepository(Update_1.Update).findOne(req.params.id);
        typeorm_1.getRepository(Update_1.Update).merge(update, req.body);
        const result = yield typeorm_1.getRepository(Update_1.Update).save(update);
        return res.json(result);
    });
}
exports.updateUpdate = updateUpdate;
function deleteUpdate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield typeorm_1.getRepository(Update_1.Update).delete(req.params.id);
        return res.json(result);
    });
}
exports.deleteUpdate = deleteUpdate;
//# sourceMappingURL=update.js.map