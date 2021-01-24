import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne} from "typeorm";
import { Article } from "./Article";


@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    authorId: string;

    @Column("varchar", {length:255})
    authorName: string;

    @Column("varchar", {length:255})
    authorPicture: string;

    @Column({ type: "text" })
    body: string;

    @Column("datetime")
    date: Date;

    @ManyToOne(type => Article, article => article.comments , {onDelete: "CASCADE"})
    article: Article;

}
