import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class Video {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    videoId: string;

    @Column("varchar", {length:255})
    videoURL: string;

    @Column("varchar", {length:255})
    title: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("datetime")
    date: Date;

    @Column("varchar", {length:255})
    thumbnail: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}