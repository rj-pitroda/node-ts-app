import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./role.entity.ts";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("character varying", { name: "name", length: 100 })
  name!: string;

  @Column("character varying", { name: "email", length: 200 })
  email!: string;

  @Column("character varying", { name: "password", length: 60, select: false })
  password!: string;

  @Column("integer", { name: "roleId" })
  roleId!: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn([{ name: "roleId", referencedColumnName: "id" }])
  role!: Role;
}
