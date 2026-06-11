import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity.ts";
import { USER_ROLE } from "../shared/enum/enum.ts";

@Entity("role")
export class Role {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number;

  @Column("enum", {
    name: "name",
    unique: true,
    enum: USER_ROLE,
  })
  name!: USER_ROLE;

  @OneToMany(() => User, (user) => user.role)
  users!: User[];
}
