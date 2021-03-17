import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert} from "typeorm";
import { v4 as uuidv4 } from "uuid";


@Entity()
export class PasswordReset extends BaseEntity {

    @PrimaryColumn("uuid")
    token: string;

    @Column("varchar", {length:255})
    firstName: string;

    @Column("varchar", {length:255})
    lastName: string;

    @Column("varchar", {length:255})
    email: string;

    @Column("datetime")
    date: Date;

    @Column("datetime")
    expirationDate: Date;

    @Column("boolean", {nullable: true})
    emailSent: boolean;

    @Column("boolean", {nullable: true})
    success: boolean;

    @Column("boolean", {nullable: true})
    activated: boolean;

    @BeforeInsert()
    addId(): void {
        this.token = uuidv4();
    }

}