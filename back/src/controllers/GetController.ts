import { Request, Response } from "express";
import { requestsRepository } from "../repositories/requestsRepository";
import { userRepository } from "../repositories/userRepository";
import { Requests } from "../entities/Requests";
import { User } from "../entities/Users";
import { Client } from "../entities/Clients";
import { clientsRepository } from "../repositories/clientsRepository";

export class GetController {
  getRequests = async (req: Request, res: Response) => {
    try {
      const allRequests: Requests[] = await requestsRepository.find({
        relations: ["client", "user"],
      });
      res.status(200).json({
        requests: allRequests,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro Interno" });
      console.log(error);
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const allUsers: User[] = await userRepository.find();
      res.status(200).json({
        users: allUsers,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro Interno" });
      console.log(error);
    }
  };

  getClients = async (req: Request, res: Response) => {
    try {
      const allClients: Client[] = await clientsRepository.find();
      res.status(200).json({
        clients: allClients,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro Interno" });
      console.log(error);
    }
  };
}
