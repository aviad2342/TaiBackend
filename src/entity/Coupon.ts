import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany} from "typeorm";
import { CouponCustomers } from "./CouponCustomers";
import { Photo } from "./Photo";


@Entity()
export class Coupon {

    @PrimaryColumn("varchar", {length:255})
    code: string;

    @Column("datetime")
    expirationDate: Date;

    @Column({ type: "int" })
    quantity: number;

    @Column("boolean")
    singleItem: boolean;

    @Column({ type: "int" })
    discount: number;

    @Column("varchar", {length:255})
    itemId: string;

    @OneToMany(type => CouponCustomers, customer => customer.coupon, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    customers: CouponCustomers[];

}