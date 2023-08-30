import { Client } from "./Client";
import { User } from "./User";

export interface Requests {
  id?: number;

  municipio?: string;

  dt_send?: Date;

  status?: string;

  dt_creation?: Date;

  dt_update?: Date;

  user?: User;

  client?: Client;

  idClient?: number;

  idUser?: number;
}
