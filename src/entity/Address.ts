import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class Address {

    @PrimaryGeneratedColumn()
    id: number;

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

}