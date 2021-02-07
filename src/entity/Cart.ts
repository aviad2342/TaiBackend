import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { CartItem } from "./CartItem";
import { Customer } from "./Customer";


@Entity()
export class Cart {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer;

    @OneToMany(type => CartItem, cartItem => cartItem.cart, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    items: CartItem[];

    @Column("varchar", {length:255, nullable: true})
    orderId: string;

}