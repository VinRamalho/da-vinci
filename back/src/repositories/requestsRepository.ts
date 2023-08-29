import { AppDataSource } from "../data-source";
import { Requests } from "../entities/Requests";

export const requestsRepository = AppDataSource.getRepository(Requests);
