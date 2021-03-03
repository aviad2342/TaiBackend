import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany} from "typeorm";
import { Photo } from "./Photo";


@Entity()
export class Coupon {

    @PrimaryColumn()
    code: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    expirationDate: Date;

    @Column({ type: "int" })
    quantity: number;

    @Column("boolean")
    singleItem: boolean;

    @Column({ type: "int" })
    discount: number;

    @Column("varchar", {length:255, nullable: true})
    itemId: string;

}