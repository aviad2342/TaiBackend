import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Photo } from "./Photo";


@Entity()
export class Album {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    authorId: string;

    @Column("varchar", {length:255})
    authorName: string;

    @Column("varchar", {length:255})
    title: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    lastEdit: Date;

    @Column("varchar", {length:255})
    thumbnail: string;

    @Column({ type: "int" })
    views: string;

    @OneToMany(type => Photo, photo => photo.album, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    photos: Photo[];

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}
