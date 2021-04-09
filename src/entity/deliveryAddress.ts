import { Column, Entity } from "typeorm";
import { Address } from "./Address";

@Entity()
export class DeliveryAddress extends Address {

    @Column("varchar", {length:255, nullable: true})
    zipCode: string;

}