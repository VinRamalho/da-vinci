import { AppDataSource } from "../data-source";
import { Client } from "../entities/Clients";

export const clientsRepository = AppDataSource.getRepository(Client);
