import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class Testimony extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    firstName: string;

    @Column("varchar", {length:255})
    lastName: string;

    @Column("datetime")
    date: Date;

    @Column("varchar", {length:255})
    content: string;

    @Column("varchar", {length:255})
    picture: string;

    @Column("boolean")
    approved: boolean;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}