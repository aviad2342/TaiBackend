import {Column, ChildEntity, OneToMany, Entity, PrimaryColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class Customer {

    @PrimaryColumn("uuid")
    id: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}