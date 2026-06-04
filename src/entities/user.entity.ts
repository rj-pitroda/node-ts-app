import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name", length: 100 })
  name!: string;

  @Column("character varying", { name: "email", length: 200 })
  email!: string;

  @Column("character varying", { name: "password", length: 60 })
  password!: string;
}
