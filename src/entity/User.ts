import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, PrimaryColumn, BeforeInsert, TableInheritance, OneToOne, JoinColumn, OneToMany} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import { Preferences } from "./Preferences";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { UserAddress } from "./UserAddress";

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

    @Column("varchar", {length:255, unique: true})
    phone: string;

    @Column("varchar", {length:255, unique: true})
    email: string;

    @Column("datetime")
    date: Date;

    @Column("varchar", {length:255})
    profilePicture: string;

    @OneToOne(type => UserAddress, {onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true})
    @JoinColumn()
    address: UserAddress;

    @OneToOne(type => Preferences, {nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true})
    @JoinColumn()
    preferences: Preferences;

    @Column("simple-array", {nullable: true})
    savedVideos: string[];

    @OneToOne(type => Cart, {nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true})
    @JoinColumn()
    cart: Cart;

    @OneToMany(type => Order, order => order.user, {nullable: true, onDelete: "CASCADE", onUpdate: "CASCADE", cascade: true} )
    orders: Order[];

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
