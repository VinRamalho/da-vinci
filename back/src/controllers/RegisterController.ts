import bcrypt from "bcrypt";
const router = require("express").Router();
import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { requestsRepository } from "../repositories/requestsRepository";
import { Requests } from "../entities/Requests";
import { User } from "../entities/Users";
import { userRepository } from "../repositories/userRepository";
import { clientsRepository } from "../repositories/clientsRepository";
import { Client } from "../entities/Clients";

enum StatusRequest {
  APROVADO = "A",
  EM_AGUARDO = "E",
  REQUERIDO = "R",
}

export class RegisterController {
  registerRequest = async (req: Request, res: Response) => {
    const { request, idUser, idClient } = req.body;

    const client: Client | null = await clientsRepository.findOne({
      where: { id: idClient },
    });
    const user: User | null = await userRepository.findOne({
      where: { id: idUser },
    });

    let newRequest: Requests = request;
    newRequest.dt_creation = new Date();
    newRequest.status = StatusRequest.REQUERIDO;
    newRequest.client = client!;
    newRequest.user = user!;

    let requestTypeOrm = requestsRepository.create(newRequest);

    try {
      await requestsRepository.save(requestTypeOrm);

      res.status(200).json({
        message: "Pedido registrado com sucesso",
        request: requestTypeOrm,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro Interno" });
      console.log(error);
    }
  };

  registerUser = async (req: Request, res: Response) => {
    const { user } = req.body;

    let newUser: User = user;
    newUser.dt_creation = new Date();

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(newUser.password, salt);
    newUser.password = passwordHash;

    const userTypeOrm = userRepository.create(newUser);

    try {
      await userRepository.save(userTypeOrm);

      res.status(200).json({
        message: "Usuario registrado com sucesso",
        user: userTypeOrm,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro Interno" });
      console.log(error);
    }
  };

  registerClient = async (req: Request, res: Response) => {
    const { client } = req.body;

    let newClient: Client = client;
    newClient.dt_creation = new Date();

    let clientTypeOrm = clientsRepository.create(newClient);

    try {
      await clientsRepository.save(clientTypeOrm);

      res.status(200).json({
        message: "Cliente registrado com sucesso",
        client: clientTypeOrm,
      });
    } catch (error) {
      res.status(500).json({ message: "Erro Interno" });
      console.log(error);
    }
  };
}
