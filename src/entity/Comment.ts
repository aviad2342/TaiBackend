import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Article } from "./Article";


@Entity()
export class Comment extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

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

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}
