import "reflect-metadata";
require("dotenv").config();
import express from "express";
const app = express();
import { AppDataSource } from "./data-source";
import mongoose from "mongoose";
import { routes } from "./routes";

AppDataSource.initialize().then(() => {
  // Ler json
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  // cors
  const cors = require("cors");
  app.use(cors());

  // Routes
  app.use(routes);

  const PORT: string = process.env.PORT || "";

  app.listen(PORT, (): void => {
    console.log(`O servidor está ouvindo na porta ${PORT}!`);
  });
});
