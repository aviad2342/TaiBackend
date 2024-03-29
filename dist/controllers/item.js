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
const typeorm_2 = require("typeorm");
const fs = require("fs");
const Item_1 = require("../entity/Item");
function getItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield typeorm_2.getRepository(Item_1.Item).find();
        res.json(items);
    });
}
exports.getItems = getItems;
function getItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_2.getRepository(Item_1.Item).findOne(req.params.id);
        res.json(item);
    });
}
exports.getItem = getItem;
function getItemByProductId(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_2.getRepository(Item_1.Item).findOne({ where: { productId: req.params.productId } });
        res.json(item);
    });
}
exports.getItemByProductId = getItemByProductId;
function addItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = typeorm_2.getRepository(Item_1.Item).create(req.body);
        const results = yield typeorm_2.getRepository(Item_1.Item).save(item).catch(error => {
            const imagePhat = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addItem = addItem;
function updateItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_2.getRepository(Item_1.Item).findOne(req.params.id);
        if (item.thumbnail !== req.body.thumbnail) {
            const imagePhat = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_2.getRepository(Item_1.Item).merge(item, req.body);
        const results = yield typeorm_2.getRepository(Item_1.Item).save(item);
        return res.json(results);
    });
}
exports.updateItem = updateItem;
function deleteItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_2.getRepository(Item_1.Item).findOne(req.params.id);
        const imagePhat = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
        if (fs.existsSync(imagePhat)) {
            fs.unlinkSync(imagePhat);
        }
        const results = yield typeorm_2.getRepository(Item_1.Item).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteItem = deleteItem;
function getProductName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const entityManager = typeorm_1.getManager();
        const products = yield entityManager.query("SELECT id, 'article' as name from crm_db.article union SELECT id, 'course' as name from crm_db.course union SELECT id, 'event' as name from crm_db.event union SELECT id, 'treatment' as name from crm_db.treatment;");
        const product = products.find(p => p.id === req.params.id);
        res.json(product.name);
    });
}
exports.getProductName = getProductName;
//# sourceMappingURL=item.js.map