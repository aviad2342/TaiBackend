import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Item";
import { Order } from "./Order";

@Entity()
export class OrderItem {

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

    @ManyToOne(type => Order, order => order.items , {onDelete: "CASCADE"})
    order: Order;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}