import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, ManyToOne, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Course } from "./Course";


@Entity()
export class Lesson extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

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

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}
