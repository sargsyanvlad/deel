import { RequestHandler, Request } from "express";
import JobsService from "../../services/jobs.service";
import { logger } from "../../utils";
import { models } from "../../db";

class JobsController {
  private jobsService: JobsService;

  constructor(jobsService: JobsService) {
    this.jobsService = jobsService;
  }

  getUnpaidJobs: RequestHandler = async (
    req: Request & { profile: { id } },
    res
  ) => {
    try {
      const unpaidJobs = await this.jobsService.getUnpaidJobs(req.profile.id);
      res.send({ result: unpaidJobs });
    } catch (err) {
      logger.error("Failed getUnpaidJobs", err);
      res.status(400).send("Something went wrong");
    }
  };

  pay: RequestHandler = async (req: Request & { profile: { id } }, res) => {
    const transaction = await models.Sequelize.transaction();
    try {
      const { job_id } = req.params;

      const job = await this.jobsService.getByIdWithContract(
        Number(job_id),
        req.profile.id
      );

      if (!job) {
        res.status(404).send("Job not found");
        return;
      }

      const paid = await this.jobsService.paySalary(
        job.price,
        job.Contract.ClientId,
        job.Contract.ContractorId,
        transaction
      );

      await this.jobsService.setPaid(Number(job_id), transaction);

      await transaction.commit();
      res.status(200).send({ result: { paid } });
      return;
    } catch (err) {
      logger.error("Failed pay", err);
      await transaction.rollback();
      res.status(400).send("Something went wrong");
    }
  };
}

export default JobsController;
