import "reflect-metadata";
import { DataSource } from "typeorm";
import { ENV_VAR } from "../utils/helper.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: ENV_VAR.DB_NAME,
  password: ENV_VAR.DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.ts"],
});
