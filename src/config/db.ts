import "reflect-metadata";
import { DataSource } from "typeorm";
import { ENV_VAR } from "../utils/helper.ts";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: ENV_VAR.DB_HOST,
  port: Number(ENV_VAR.DB_PORT),
  username: "postgres",
  database: ENV_VAR.DB_NAME,
  password: ENV_VAR.DB_PASSWORD,
  synchronize: false,
  logging: false,
  entities: ["src/entities/*.entity.ts"],
});
