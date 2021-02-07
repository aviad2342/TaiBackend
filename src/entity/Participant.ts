import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert, ManyToOne} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Event } from "./Event";


@Entity()
export class Participant extends BaseEntity {

    @PrimaryColumn("varchar", {length:255})
    id: string;

    @Column("varchar", {length:255})
    firstName: string;

    @Column("varchar", {length:255})
    lastName: string;

    @Column("varchar", {length:255})
    phone: string;

    @Column("varchar", {length:255})
    email: string;

    @Column("varchar", {length:255})
    picture: string;

    @ManyToOne(type => Event, event => event.participants , {onDelete: "CASCADE"})
    event: Event;
}