import {Router} from "express";

import * as CouponController from "../controllers/coupon";


const router: Router = Router();

router.get("/coupons", CouponController.getCoupons);

router.get("/coupon/:code", CouponController.getCoupon);

router.get("/coupons/:customerId", CouponController.getCustomerCoupons);

router.post("/coupon", CouponController.addCoupon);

router.post("/customer", CouponController.addCouponCustomer);

router.put("/coupon/:code", CouponController.updateCoupon);

router.delete("/coupon/:code", CouponController.deleteCoupon);


export const couponRouter: Router = router;