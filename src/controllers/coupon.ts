import {Request, Response} from "express";
import {getConnection, Repository, DeleteResult} from "typeorm";
import {getRepository} from "typeorm";
import { Coupon } from "../entity/Coupon";
import { CouponCustomers } from "../entity/CouponCustomers";


export async function getCoupons(req: Request, res: Response): Promise<void> {
    const coupons: Coupon[] = await getRepository(Coupon).find();
    res.json(coupons);
}

export async function getCoupon(req: Request, res: Response): Promise<void> {
    const coupon: Coupon = await getRepository(Coupon).findOne(req.params.code, { relations: ["customers"] });
         res.json(coupon);
}

export async function getCustomerCoupons(req: Request, res: Response): Promise<void> {
     const coupons: Coupon[] = await getRepository(Coupon).find({where: { customer: req.params.customerId }, relations: ["customers"] });
         res.json(coupons);
 }

 export async function addCoupon(req: Request, res: Response): Promise<any> {
     const coupon: any = getRepository(Coupon).create(req.body);
     const results: Coupon = await getRepository(Coupon).save(coupon);
     return res.json(results);
}

export async function addCouponCustomer(req: Request, res: Response): Promise<any> {
    const coupon: Coupon = await getRepository(Coupon).findOne(req.body.code);
    coupon.quantity--;
    await getRepository(Coupon).save(coupon);
    const customer: any = getRepository(CouponCustomers).create(req.body);
    const results: CouponCustomers = await getRepository(CouponCustomers).save(customer);
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