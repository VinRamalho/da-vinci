// Arquivo User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Requests } from "./Requests";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "timestamp" })
  dt_creation: Date;

  @Column({ type: "timestamp", nullable: true })
  dt_update: Date;

  @OneToMany(() => Requests, (request) => request.user)
  requests: Requests[];
}
