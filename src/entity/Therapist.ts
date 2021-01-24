import {Column, ChildEntity} from "typeorm";
import { User } from "./User";


@ChildEntity()
export class Therapist extends User {

    @Column("simple-array")
    treatmentTypes: string[];

    @Column("varchar", {length:255})
    resume: string;

    @Column("boolean")
    admin: boolean;

}