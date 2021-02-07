import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn} from "typeorm";

export enum Category {
    BOOKS = "ספרים",
    TREATMENTS = "טיפולים",
    CONFERENCES = "כנסים",
    COURSES = "קורסים",
    ARTICLES = "מאמרים",
    ACCESSORIES = "אביזרים",
    OTHER = "אחר"
}

@Entity()
export class Item extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
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

}
