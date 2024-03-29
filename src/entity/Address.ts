import { BeforeInsert, Column, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export abstract class Address {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    country: string;

    @Column("varchar", {length:255})
    city: string;

    @Column("varchar", {length:255})
    street: string;

    @Column({ type: "int" })
    houseNumber: number;

    @Column("varchar", {length:255})
    apartment: string;

    @Column("varchar", {length:255})
    entry: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}