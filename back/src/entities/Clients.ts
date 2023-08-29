// Arquivo Client.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Requests } from "./Requests";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "timestamp" })
  dt_creation: Date;

  @Column({ type: "timestamp", nullable: true })
  dt_update: Date;

  @OneToMany(() => Requests, (request) => request.client)
  requests: Requests[];
}
