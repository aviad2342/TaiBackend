import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn} from "typeorm";
import { CartItem } from "./CartItem";
import { Customer } from "./Customer";
import { DeliveryAddress } from "./deliveryAddress";
import { Item } from "./Item";
import { OrderItem } from "./OrderItem";


@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    cartId: string;

    @Column("datetime")
    date: Date;

    @Column("varchar", {length:255})
    note: string;

    @Column({ type: "float" })
    delivery: number;

    @Column("varchar", {length:255})
    couponCode: string;

    @Column({ type: "float" })
    totalItems: number;

    @Column({ type: "float" })
    totalPayment: number;

    @Column("boolean")
    receivedPayment: boolean;

    @Column("varchar", {length:255})
    confirmPaymentNumber: string;

    @ManyToOne(type => Customer, customer => customer.orders , {onDelete: "CASCADE"})
    customer: Customer;

    @OneToOne(() => DeliveryAddress, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true})
    @JoinColumn()
    address: DeliveryAddress;

    @OneToMany(type => OrderItem, orderItem => orderItem.order, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    items: OrderItem[];

}