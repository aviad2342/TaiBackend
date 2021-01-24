import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne} from "typeorm";
import { Coupon } from "./Coupon";


@Entity()
export class CouponCustomers {

    @PrimaryColumn("varchar", {length:255})
    customerId: string;

    @ManyToOne(type => Coupon, coupon => coupon.customers , {onDelete: "CASCADE"})
    coupon: Coupon;

}