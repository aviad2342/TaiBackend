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
function getOrders(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const orders = yield typeorm_1.getRepository(Order_1.Order).find();
        res.json(orders);
    });
}
exports.getOrders = getOrders;
function getOrder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield typeorm_1.getRepository(Order_1.Order).findOne(req.params.id, { relations: ["customer", "address", "items"] });
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
        const order = yield typeorm_1.getRepository(Order_1.Order).findOne(req.params.id);
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
        const orders = yield typeorm_1.getRepository(Order_1.Order).find({ where: { customer: req.params.customer } });
        return res.json(orders);
    });
}
exports.getOrdersByCustomer = getOrdersByCustomer;
//# sourceMappingURL=order.js.map