"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CouponController = require("../controllers/coupon");
const router = express_1.Router();
router.get("/coupons", CouponController.getCoupons);
router.get("/coupon/:code", CouponController.getCoupon);
router.get("/coupons/:customerId", CouponController.getCustomerCoupons);
router.post("/coupon", CouponController.addCoupon);
router.post("/customer", CouponController.addCouponCustomer);
router.put("/coupon/:code", CouponController.updateCoupon);
router.delete("/coupon/:code", CouponController.deleteCoupon);
exports.couponRouter = router;
//# sourceMappingURL=coupon.js.map