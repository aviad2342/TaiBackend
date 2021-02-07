import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class Treatment {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    treatmentName: string;

    @Column("varchar", {length:255})
    treatmentType: string;

    @Column("varchar", {length:255})
    description: string;

    @Column("varchar", {length:255})
    thumbnail: string;

    @Column("varchar", {length:255})
    catalogNumber: string;

    @Column("varchar", {length:255})
    therapistId: string;

    @Column("varchar", {length:255})
    therapistName: string;

    @Column("varchar", {length:255})
    therapistProfilePicture: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }


}