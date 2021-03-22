import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, OneToMany, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class Update {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    updateType: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    endUpdate: Date;

    @Column("varchar", {length:255})
    url: string;

    @Column("boolean")
    active: boolean;

    @Column("varchar", {length:255, nullable: true})
    productId: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

}