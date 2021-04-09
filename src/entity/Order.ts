import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Customer } from "./Customer";
import { DeliveryAddress } from "./deliveryAddress";
import { OrderItem } from "./OrderItem";
import { User } from "./User";


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

    @Column("varchar", {length:255, nullable: true})
    confirmPaymentNumber: string;

    @OneToOne(() => DeliveryAddress, {nullable: true, onUpdate: "CASCADE", cascade: true})
    @JoinColumn()
    address: DeliveryAddress;

    @OneToMany(type => OrderItem, orderItem => orderItem.order, {nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    items: OrderItem[];

    @ManyToOne(type => User, user => user.orders , {onDelete: "CASCADE"})
    @JoinColumn()
    user: User;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}