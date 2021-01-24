import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne} from "typeorm";
import { Album } from "./Album";


@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    title: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("datetime")
    date: Date;

    @Column("varchar", {length:255})
    url: string;

    @ManyToOne(type => Album, album => album.photos , {onDelete: "CASCADE"})
    album: Album;

}