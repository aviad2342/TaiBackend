import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Cart } from "./Cart";
import { Category } from "./Item";

@Entity()
export class CartItem extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    name: string;

    @Column("varchar", {length:255})
    productId: string;

    @Column("varchar", {length:255})
    description: string;

    @Column({ type: "float" })
    price: number;

    @Column("varchar", {length:255})
    thumbnail: string;

    @Column("varchar", {length:255})
    catalogNumber: string;

    @Column({ type: "int" })
    quantity: number;

    @Column({
        type: "enum",
        enum: Category,
        default: Category.OTHER
    })
    category: Category;

    @Column("varchar", {length:255})
    itemId: string;

    @Column({ type: "int" })
    units: number;

    @ManyToOne(type => Cart, cart => cart.items , {onDelete: "CASCADE"})
    cart: Cart;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}