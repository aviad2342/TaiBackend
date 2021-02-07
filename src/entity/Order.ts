import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "./Customer";
import { DeliveryAddress } from "./deliveryAddress";
import { OrderItem } from "./OrderItem";


@Entity()
export class Order {

    @PrimaryColumn("uuid")
    id: string;

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

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}