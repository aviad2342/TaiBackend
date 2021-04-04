import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { CartItem } from "./CartItem";


@Entity()
export class Cart {

    @PrimaryColumn("uuid")
    id: string;

    @OneToMany(() => CartItem, cartItem => cartItem.cart, {nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    @JoinColumn()
    items: CartItem[];

    @Column("varchar", {length:255, nullable: true})
    orderId: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}