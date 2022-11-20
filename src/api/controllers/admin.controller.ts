import { RequestHandler, Request } from "express";
import ProfileService from "../../services/profile.service";
import { logger } from "../../utils";
import JobsService from "../../services/jobs.service";

class AdminController {
  private profileService: ProfileService;
  private jobService: JobsService;

  constructor(profileService: ProfileService, jobService: JobsService) {
    this.profileService = profileService;
    this.jobService = jobService;
  }

  getTotalEarnedProfessions: RequestHandler = async (
    req: Request & { profile: { id } },
    res
  ) => {
    try {
      const { start, end } = req.query;
      const result = await this.profileService.getTotalEarnedProfessions(
        start as string,
        end as string
      );
      res.send(result);
    } catch (err) {
      logger.error("Failed getTotalEarnedProfessions", err);
      res.status(400).send("Something went wrong");
    }
  };

  getBestClients: RequestHandler = async (
    req: Request & { profile: { id } },
    res
  ) => {
    try {
      const { start, end, limit } = req.query;

      const result = await this.profileService.getBestClients(
        start as string,
        end as string,
        limit as string
      );

      res.send(result);
    } catch (err) {
      logger.error("Failed getBestClients", err);
      res.status(400).send("Something went wrong");
    }
  };
}

export default AdminController;
