import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import { Coupon } from "../entity/Coupon";
import { CouponUsers } from "../entity/CouponUsers";


export async function getCoupons(req: Request, res: Response): Promise<void> {
    const coupons: Coupon[] = await getRepository(Coupon).find();
    res.json(coupons);
}

export async function getCoupon(req: Request, res: Response): Promise<void> {
    const coupon: Coupon = await getRepository(Coupon).findOne(req.params.code);
         res.json(coupon);
}

export async function getCustomerCoupons(req: Request, res: Response): Promise<void> {
     const userCoupons: CouponUsers[] = await getRepository(CouponUsers).find({ where: { album: req.params.userId } });
         res.json(userCoupons);
 }

 export async function addCoupon(req: Request, res: Response): Promise<any> {
     const coupon: any = getRepository(Coupon).create(req.body);
     const results: Coupon = await getRepository(Coupon).save(coupon);
     return res.json(results);
}

export async function couponUse(req: Request, res: Response): Promise<any> {
    const coupon: Coupon = await getRepository(Coupon).findOne(req.body.couponCode);
    coupon.quantity--;
    await getRepository(Coupon).save(coupon);
    const couponUser: any = getRepository(CouponUsers).create(req.body);
    const results: CouponUsers = await getRepository(CouponUsers).save(couponUser);
    return res.json(results);
}

export async function updateCoupon(req: Request, res: Response): Promise<any> {
    const coupon: Coupon = await getRepository(Coupon).findOne(req.params.id);
    getRepository(Coupon).merge(coupon, req.body);
    const results: Coupon = await getRepository(Coupon).save(coupon);
    return res.json(results);
}

export async function deleteCoupon(req: Request, res: Response): Promise<any> {
    const results: DeleteResult = await getRepository(Coupon).delete(req.params.id);
    return res.json(results);
}