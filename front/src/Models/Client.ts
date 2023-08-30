import { Requests } from "./Request";

export interface Client {
  id: number;

  name: string;

  email: string;

  dt_creation: Date;

  dt_update: Date;

  requests: Requests[];
}
