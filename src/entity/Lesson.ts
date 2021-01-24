import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne} from "typeorm";
import { Course } from "./Course";


@Entity()
export class Lesson extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length:255})
    videoId: string;

    @Column("varchar", {length:255})
    videoURL: string;

    @Column({ type: "int" })
    lessonNumber: string;

    @Column("varchar", {length:255})
    title: string;

    @Column({ type: "text" })
    description: string;

    @Column("datetime")
    date: Date;

    @Column("varchar", {length:255})
    thumbnail: string;

    @ManyToOne(type => Course, course => course.lessons , {onDelete: "CASCADE"})
    course: Course;

}
