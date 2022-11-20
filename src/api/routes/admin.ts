import * as express from "express";
const adminRouter = express.Router();
import { models } from "../../db";
import AdminController from "../controllers/admin.controller";
import { ProfilesRepository } from "../../repositories/profile.repository";
import { JobsRepository } from "../../repositories/jobs.repository";

import ProfileService from "../../services/profile.service";
import JobsService from "../../services/jobs.service";

const { Profiles, Jobs, Sequelize } = models;
const profileRepository = new ProfilesRepository(Profiles, Sequelize);
const jobsRepository = new JobsRepository(Jobs, Sequelize);

const profileService = new ProfileService(profileRepository);
const jobsService = new JobsService(jobsRepository, profileService);

const adminController = new AdminController(profileService, jobsService);

adminRouter.get("/best-profession", adminController.getTotalEarnedProfessions);
adminRouter.get("/best-clients", adminController.getBestClients);

export { adminRouter };
