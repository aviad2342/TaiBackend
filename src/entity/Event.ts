import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany} from "typeorm";
import { Participant } from "./Participant";
import { Speaker } from "./Speaker";


@Entity()
export class Event extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    title: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    beginsAt: Date;

    @Column("datetime")
    endsAt: Date;

    @Column("varchar", {length:255})
    thumbnail: string;

    @Column({ type: "int" })
    maxCapacity: number;

    @Column("varchar", {length:255})
    placeName: string;

    @Column("varchar", {length:255})
    country: string;

    @Column("varchar", {length:255})
    city: string;

    @Column("varchar", {length:255})
    street: string;

    @Column("varchar", {length:255})
    houseNumber: string;

    @Column("varchar", {length:255})
    apartment: string;

    @Column("varchar", {length:255})
    entry: string;

    @Column("varchar", {length:255})
    catalogNumber: string;

    @Column("simple-array")
    images: string[];

    @OneToMany(type => Participant, participant => participant.event, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    participants: Participant[];

    @OneToMany(type => Speaker, speaker => speaker.event, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true } )
    speakers: Speaker[];

}