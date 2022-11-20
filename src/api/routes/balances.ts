import * as express from "express";
const balancesRouter = express.Router();
import BalancesController from "../controllers/balances.controller";
import ProfileService from "../../services/profile.service";
import { ProfilesRepository } from "../../repositories/profile.repository";
import { models } from "../../db";
import { JobsRepository } from "../../repositories/jobs.repository";
import JobsService from "../../services/jobs.service";

const { Profiles, Jobs, Sequelize } = models;

const profileRepository = new ProfilesRepository(Profiles, Sequelize);
const profileService = new ProfileService(profileRepository);
const jobsRepository = new JobsRepository(Jobs, Sequelize);
const jobsService = new JobsService(jobsRepository, profileService);

const balancesController = new BalancesController(profileService, jobsService);

balancesRouter.post("/deposit/:userId", balancesController.deposit);

export { balancesRouter };
