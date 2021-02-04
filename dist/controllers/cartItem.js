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
const CartItem_1 = require("../entity/CartItem");
function getAllCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield typeorm_1.getRepository(CartItem_1.CartItem).find();
        res.json(items);
    });
}
exports.getAllCartItems = getAllCartItems;
function getCartItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const items = yield typeorm_1.getRepository(CartItem_1.CartItem).find({ where: { album: req.params.id } });
        res.json(items);
    });
}
exports.getCartItems = getCartItems;
function getCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_1.getRepository(CartItem_1.CartItem).findOne(req.params.id);
        res.json(item);
    });
}
exports.getCartItem = getCartItem;
function addCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = typeorm_1.getRepository(CartItem_1.CartItem).create(req.body);
        const results = yield typeorm_1.getRepository(CartItem_1.CartItem).save(item).catch(error => {
            const imagePhat = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        });
        return res.json(results);
    });
}
exports.addCartItem = addCartItem;
function updateCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_1.getRepository(CartItem_1.CartItem).findOne(req.params.id);
        if (item.thumbnail !== req.body.thumbnail) {
            const imagePhat = item.thumbnail.replace("http://aviadbenhayun.com:3000/", "./src/");
            if (fs.existsSync(imagePhat)) {
                fs.unlinkSync(imagePhat);
            }
        }
        typeorm_1.getRepository(CartItem_1.CartItem).merge(item, req.body);
        const results = yield typeorm_1.getRepository(CartItem_1.CartItem).save(item);
        return res.json(results);
    });
}
exports.updateCartItem = updateCartItem;
function deleteCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(CartItem_1.CartItem).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteCartItem = deleteCartItem;
//# sourceMappingURL=cartItem.js.map