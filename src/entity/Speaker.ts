import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert, ManyToOne} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Event } from "./Event";


@Entity()
export class Speaker extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    title: string;

    @Column("varchar", {length:255})
    firstName: string;

    @Column("varchar", {length:255})
    lastName: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("varchar", {length:255})
    picture: string;

    @ManyToOne(type => Event, event => event.speakers , {onDelete: "CASCADE"})
    event: Event;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }
}
