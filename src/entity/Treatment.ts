import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";


@Entity()
export class Treatment {

    @PrimaryGeneratedColumn()
    id: number;

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


}