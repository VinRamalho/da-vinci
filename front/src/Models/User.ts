import { Requests } from "./Request";

export interface User {
  id: number;

  name: string;

  email: string;

  password: string;

  dt_creation: Date;

  dt_update: Date;

  requests: Requests[];
}
