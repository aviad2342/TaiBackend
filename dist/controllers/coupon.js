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
const Coupon_1 = require("../entity/Coupon");
const CouponCustomers_1 = require("../entity/CouponCustomers");
function getCoupons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coupons = yield typeorm_1.getRepository(Coupon_1.Coupon).find();
        res.json(coupons);
    });
}
exports.getCoupons = getCoupons;
function getCoupon(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coupon = yield typeorm_1.getRepository(Coupon_1.Coupon).findOne(req.params.code, { relations: ["customers"] });
        res.json(coupon);
    });
}
exports.getCoupon = getCoupon;
function getCustomerCoupons(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coupons = yield typeorm_1.getRepository(Coupon_1.Coupon).find({ where: { customer: req.params.customerId }, relations: ["customers"] });
        res.json(coupons);
    });
}
exports.getCustomerCoupons = getCustomerCoupons;
function addCoupon(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coupon = typeorm_1.getRepository(Coupon_1.Coupon).create(req.body);
        const results = yield typeorm_1.getRepository(Coupon_1.Coupon).save(coupon);
        return res.json(results);
    });
}
exports.addCoupon = addCoupon;
function addCouponCustomer(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coupon = yield typeorm_1.getRepository(Coupon_1.Coupon).findOne(req.body.code);
        coupon.quantity--;
        yield typeorm_1.getRepository(Coupon_1.Coupon).save(coupon);
        const customer = typeorm_1.getRepository(CouponCustomers_1.CouponCustomers).create(req.body);
        const results = yield typeorm_1.getRepository(CouponCustomers_1.CouponCustomers).save(customer);
        return res.json(results);
    });
}
exports.addCouponCustomer = addCouponCustomer;
function updateCoupon(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const coupon = yield typeorm_1.getRepository(Coupon_1.Coupon).findOne(req.params.id);
        typeorm_1.getRepository(Coupon_1.Coupon).merge(coupon, req.body);
        const results = yield typeorm_1.getRepository(Coupon_1.Coupon).save(coupon);
        return res.json(results);
    });
}
exports.updateCoupon = updateCoupon;
function deleteCoupon(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const results = yield typeorm_1.getRepository(Coupon_1.Coupon).delete(req.params.id);
        return res.json(results);
    });
}
exports.deleteCoupon = deleteCoupon;
//# sourceMappingURL=coupon.js.map