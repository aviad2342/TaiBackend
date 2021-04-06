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
const Cart_1 = require("../entity/Cart");
const CartItem_1 = require("../entity/CartItem");
function getCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield typeorm_1.getRepository(Cart_1.Cart).findOne(req.params.id, { relations: ["items"] });
        res.json(cart);
    });
}
exports.getCart = getCart;
function getCustomerCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield typeorm_1.getRepository(Cart_1.Cart).findOne({ where: { customer: req.params.id }, relations: ["items"] });
        res.json(cart);
    });
}
exports.getCustomerCart = getCustomerCart;
function isItemInCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield typeorm_1.getRepository(Cart_1.Cart).findOne(req.params.id, { relations: ["items"] });
        let inCart = false;
        if (cart.items !== undefined) {
            inCart = cart.items.map(i => i.itemId).includes(req.params.itemId);
        }
        res.json(inCart);
    });
}
exports.isItemInCart = isItemInCart;
function addCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = typeorm_1.getRepository(Cart_1.Cart).create(req.body);
        const results = yield typeorm_1.getRepository(Cart_1.Cart).save(cart);
        return res.json(results);
    });
}
exports.addCart = addCart;
function addCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = typeorm_1.getRepository(CartItem_1.CartItem).create(req.body);
        const results = yield typeorm_1.getRepository(CartItem_1.CartItem).save(item);
        return res.json(results);
    });
}
exports.addCartItem = addCartItem;
function updateCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const cart = yield typeorm_1.getRepository(Cart_1.Cart).findOne(req.params.id);
        typeorm_1.getRepository(Cart_1.Cart).merge(cart, req.body);
        const results = yield typeorm_1.getRepository(Cart_1.Cart).save(cart);
        return res.json(results);
    });
}
exports.updateCart = updateCart;
function updateCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const item = yield typeorm_1.getRepository(CartItem_1.CartItem).findOne(req.params.id);
        typeorm_1.getRepository(CartItem_1.CartItem).merge(item, req.body);
        const results = yield typeorm_1.getRepository(CartItem_1.CartItem).save(item);
        return res.json(results);
    });
}
exports.updateCartItem = updateCartItem;
function deleteCart(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(Cart_1.Cart).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteCart = deleteCart;
function deleteCartItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(CartItem_1.CartItem).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteCartItem = deleteCartItem;
//# sourceMappingURL=cart.js.map