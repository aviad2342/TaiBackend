import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany} from "typeorm";
import { Comment } from "./Comment";


@Entity()
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    authorId: string;

    @Column("varchar", {length:255})
    authorName: string;

    @Column("varchar", {length:255})
    catalogNumber: string;

    @Column("varchar", {length:255})
    title: string;

    @Column("varchar", {length:255})
    subtitle: string;

    @Column({ type: "text" })
    body: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    lastEdit: Date;

    @Column("varchar", {length:255})
    thumbnail: string;

    @Column("varchar", {length:255})
    pdf: string;

    @Column({ type: "int" })
    views: number;

    @OneToMany(type => Comment, comment => comment.article, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    comments: Comment[];

}
