import {Entity, Column, BaseEntity, PrimaryColumn, OneToMany, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class Preferences {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    language: string;

    @Column("varchar", {length:255})
    color: string;

    @Column("varchar", {length:255})
    brightness: string;

    @Column("varchar", {length:255})
    volume: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}