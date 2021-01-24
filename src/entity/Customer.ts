import {Column, ChildEntity, OneToMany} from "typeorm";
import { Order } from "./Order";
import { User } from "./User";


@ChildEntity()
export class Customer extends User {

    @OneToMany(type => Order, order => order.customer, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    orders: Order[];

}