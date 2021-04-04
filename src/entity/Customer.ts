import {Column, ChildEntity, OneToMany} from "typeorm";


@ChildEntity()
export class Customer {

    @Column("varchar", {length:255})
    orders: string;

}