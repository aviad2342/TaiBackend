import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert, TableInheritance} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class CouponUsers extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    userId: string;

    @Column("varchar", {length:255})
    couponCode: string;

    @Column("datetime")
    date: Date;
}