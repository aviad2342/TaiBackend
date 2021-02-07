import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "./CartItem";
import { Customer } from "./Customer";


@Entity()
export class Cart {

    @PrimaryColumn("uuid")
    id: string;

    @OneToOne(() => Customer)
    @JoinColumn()
    customer: Customer;

    @OneToMany(type => CartItem, cartItem => cartItem.cart, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    items: CartItem[];

    @Column("varchar", {length:255, nullable: true})
    orderId: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}