import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany} from "typeorm";
import { Lesson } from "./Lesson";


@Entity()
export class Course extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    authorId: string;

    @Column("varchar", {length:255})
    authorName: string;

    @Column("varchar", {length:255})
    catalogNumber: string;

    @Column("varchar", {length:255})
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    lastEdit: Date;

    @Column("varchar", {length:255})
    thumbnail: string;

    @Column({ type: "int" })
    courseLessons: string;

    @OneToMany(type => Lesson, lesson => lesson.course, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    lessons: Lesson[];

}
