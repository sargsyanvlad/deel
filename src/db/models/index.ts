import * as fs from "fs";
import * as path from "path";
import { Sequelize, Op } from "sequelize";

import dbConfig from "./configs";

type DB = {
  [key: string]: any;
  Sequelize?: Sequelize;
  Op?: typeof Op;
};

const excludeFiles = [path.basename(__filename), "configs.ts"];
const db: DB = {};

const config = dbConfig[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(config.name, config.username, config.password, {
  dialect: config.dialect,
});

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      !file.startsWith(".") &&
      !excludeFiles.includes(file) &&
      file.endsWith(".ts")
  )
  .forEach((file) => {
    const { getModel } = require(path.join(__dirname, file));
    const model = getModel(sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .authenticate()
  .then(() => console.log("database is connected"))
  .catch((err) => {
    throw err;
  });

db.Sequelize = sequelize;
db.Op = Op;

export default db;
