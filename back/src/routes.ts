import { Router } from "express";
import { RegisterController } from "./controllers/RegisterController";
import { GetController } from "./controllers/GetController";

export const routes = Router();

// Login
// routes.post("/api/auth/login", new LoginController().login);

// Create new Request
routes.post("/api/register/request", new RegisterController().registerRequest);

// Create new User
routes.post("/api/register/user", new RegisterController().registerUser);

// Create new Client
routes.post("/api/register/client", new RegisterController().registerClient);

// Get Requests
routes.get("/api/get/requests", new GetController().getRequests);

// Get Usets
routes.get("/api/get/users", new GetController().getUsers);

// Get Clients
routes.get("/api/get/clients", new GetController().getClients);
