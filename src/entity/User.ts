import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert, TableInheritance} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export class User extends BaseEntity {

    @PrimaryColumn("uuid")
    id: string;

    @Column("varchar", {length:255})
    firstName: string;

    @Column("varchar", {length:255})
    lastName: string;

    @Column("varchar", {length:255})
    password: string;

    @Column("varchar", {length:255})
    phone: string;

    @Column("varchar", {length:255})
    email: string;

    @Column("date")
    date: Date;

    @Column("varchar", {length:255})
    country: string;

    @Column("varchar", {length:255})
    city: string;

    @Column("varchar", {length:255})
    street: string;

    @Column("varchar", {length:255})
    houseNumber: string;

    @Column("varchar", {length:255})
    apartment: string;

    @Column("varchar", {length:255})
    entry: string;

    @Column("varchar", {length:255})
    profilePicture: string;

    @BeforeInsert()
    addId(): void {
        this.id = uuidv4();
    }

    hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
