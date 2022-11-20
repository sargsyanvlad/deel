import * as express from "express";
const contractRouter = express.Router();
import ContractsController from "../controllers/contracts.controller";
import auth from "../middleweares/authentication.middlewear";
import { models } from "../../db";
import ContractsService from "../../services/contracts.service";
import { ContractsRepository } from "../../repositories/contracts.repository";
const { Contracts, Sequelize } = models;

//
const contractsRepository = new ContractsRepository(Contracts, Sequelize);
const staffService = new ContractsService(contractsRepository);
const contractsController = new ContractsController(staffService);

contractRouter.use(auth.getProfile);
contractRouter.get("/", contractsController.getAllContracts);
contractRouter.get("/:id", contractsController.getById);

export { contractRouter };
