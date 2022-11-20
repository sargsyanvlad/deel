import * as express from "express";
const jobRouter = express.Router();
import JobsController from "../controllers/jobs.controller";
import auth from "../middleweares/authentication.middlewear";
import { models } from "../../db";

import JobsService from "../../services/jobs.service";
import ProfileService from "../../services/profile.service";

const { Jobs, Profiles, Sequelize } = models;

import { JobsRepository } from "../../repositories/jobs.repository";
import { ProfilesRepository } from "../../repositories/profile.repository";

const profilesRepository = new ProfilesRepository(Profiles, Sequelize);
const profileService = new ProfileService(profilesRepository);

const jobsRepository = new JobsRepository(Jobs, Sequelize);
const jobsService = new JobsService(jobsRepository, profileService);
const jobsController = new JobsController(jobsService);

jobRouter.use(auth.getProfile);
jobRouter.get("/unpaid", jobsController.getUnpaidJobs);
jobRouter.post("/:job_id/pay", jobsController.pay);

export { jobRouter };
