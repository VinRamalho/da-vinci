import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";
import { Client } from "./Clients";

@Entity("requests")
export class Requests {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  municipio: string;

  @Column({ type: "timestamp" })
  dt_send: Date;

  @Column({ type: "varchar", length: 1 })
  status: string;

  @Column({ type: "timestamp" })
  dt_creation: Date;

  @Column({ type: "timestamp", nullable: true })
  dt_update: Date;

  @ManyToOne(() => User, (user) => user.requests)
  user: User;

  @ManyToOne(() => Client, (client) => client.requests)
  client: Client;
}
