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
const Order_1 = require("../entity/Order");
const uuid_1 = require("uuid");
const Cart_1 = require("../entity/Cart");
const Coupon_1 = require("../entity/Coupon");
const CouponUsers_1 = require("../entity/CouponUsers");
const CartItem_1 = require("../entity/CartItem");
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield typeorm_1.getRepository(Order_1.Order).find();
        res.json(orders);
    });
}
exports.getOrders = getOrders;
function getOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield typeorm_1.getRepository(Order_1.Order).findOne(req.params.id, { relations: ["user", "address", "items"] });
        res.json(order);
    });
}
exports.getOrder = getOrder;
function getOrderItems(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield typeorm_1.getRepository(Order_1.Order).findOne(req.params.id, { relations: ["items"] });
        res.json(order.items);
    });
}
exports.getOrderItems = getOrderItems;
function addOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = typeorm_1.getRepository(Order_1.Order).create(req.body);
        const results = yield typeorm_1.getRepository(Order_1.Order).save(order);
        return res.json(results);
    });
}
exports.addOrder = addOrder;
function updateOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield typeorm_1.getRepository(Order_1.Order).findOne(req.params.id, { relations: ["user", "address", "items"] });
        typeorm_1.getRepository(Order_1.Order).merge(order, req.body);
        const results = yield typeorm_1.getRepository(Order_1.Order).save(order);
        return res.json(results);
    });
}
exports.updateOrder = updateOrder;
function deleteOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(Order_1.Order).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteOrder = deleteOrder;
function getOrdersByItem(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield typeorm_1.getRepository(Order_1.Order).find();
        return res.json(orders);
    });
}
exports.getOrdersByItem = getOrdersByItem;
function getOrdersByCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield typeorm_1.getRepository(Order_1.Order).find({ where: { user: req.params.user } });
        return res.json(orders);
    });
}
exports.getOrdersByCustomer = getOrdersByCustomer;
function commitPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmPaymentNumber = uuid_1.v4();
        return res.json(confirmPaymentNumber);
    });
}
exports.commitPayment = commitPayment;
function completeOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield typeorm_1.getRepository(Order_1.Order).findOne(req.params.id, { relations: ["user", "address", "items"] });
        typeorm_1.getRepository(Order_1.Order).merge(order, req.body);
        const results = yield typeorm_1.getRepository(Order_1.Order).save(order);
        const cart = yield typeorm_1.getRepository(Cart_1.Cart).findOne(order.cartId, { relations: ["items"] });
        yield typeorm_1.getRepository(CartItem_1.CartItem).remove(cart.items);
        cart.orderId = null;
        yield typeorm_1.getRepository(Cart_1.Cart).save(cart);
        if (order.couponCode) {
            const coupon = yield typeorm_1.getRepository(Coupon_1.Coupon).findOne(order.couponCode);
            coupon.quantity--;
            yield typeorm_1.getRepository(Coupon_1.Coupon).save(coupon);
            const couponUsers = new CouponUsers_1.CouponUsers();
            couponUsers.id = null;
            couponUsers.userId = order.user.id;
            couponUsers.couponCode = coupon.code;
            couponUsers.date = new Date();
            const couponUser = typeorm_1.getRepository(CouponUsers_1.CouponUsers).create(couponUsers);
            yield typeorm_1.getRepository(CouponUsers_1.CouponUsers).save(couponUser);
        }
        return res.json(results);
    });
}
exports.completeOrder = completeOrder;
//# sourceMappingURL=order.js.map