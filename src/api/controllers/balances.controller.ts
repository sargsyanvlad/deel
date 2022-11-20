import { RequestHandler, Request } from "express";
import ProfileService from "../../services/profile.service";
import { logger } from "../../utils";
import { models } from "../../db";
import JobsService from "../../services/jobs.service";

class BalancesController {
  private profileService: ProfileService;
  private jobService: JobsService;

  constructor(profileService: ProfileService, jobService: JobsService) {
    this.profileService = profileService;
    this.jobService = jobService;
  }

  deposit: RequestHandler = async (req: Request & { profile: { id } }, res) => {
    const transaction = await models.Sequelize.transaction();
    try {
      const { userId } = req.params;
      const { amount } = req.body;

      const { canDeposit, totalUnpaid } = await this.jobService.canDeposit(
        Number(userId),
        Math.abs(amount)
      );

      if (canDeposit) {
        const deposited = await this.profileService.deposit(
          Math.abs(amount),
          Number(userId),
          transaction
        );
        res.send({ result: deposited });
        return;
      }

      res.status(400).send({
        result: {
          message: `You cant deposit more that 25% of your total unpaid Jobs ${totalUnpaid} `,
        },
      });
    } catch (err) {
      logger.error("Failed deposit", err);
      res.status(400).send("Something went wrong");
    }
  };
}

export default BalancesController;
