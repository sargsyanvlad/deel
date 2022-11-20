import * as dotenv from "dotenv";
import { Dialect } from "sequelize";
dotenv.config();

export default {
  development: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: "postgres" as Dialect,
    logging: true,
  },
  production: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: "postgres" as Dialect,
    logging: true,
  },
  test: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    dialect: "postgres" as Dialect,
    logging: true,
  },
};
