import { BaseRepository } from "./base.repository";
import { JobEntity } from "../entities/Job";
import { models } from "../db/";
import { Op, QueryTypes, Transaction } from "sequelize";
import { ContractEntity } from "../entities/Contract";
import { GenericObject } from "../types";

export class JobsRepository extends BaseRepository<JobEntity> {
  findAll(): Promise<JobEntity[]> {
    return this.model.findAll();
  }

  getUnpaidJobs(profileId: number): Promise<JobEntity> {
    return this.model.findAll({
      where: {
        paid: null,
      },
      include: [
        {
          model: models.Contracts,
          where: {
            status: { [Op.ne]: "terminated" },
            [Op.or]: {
              ClientId: profileId,
              ContractorId: profileId,
            },
          },
          required: true,
        },
      ],
    });
  }

  getTotalUnpaidAmount(profileId: number): Promise<Array<GenericObject>> {
    return this.sequelize.query(
      `
    SELECT
      SUM(price) as "totalUnpaid",
      "ClientId"
        FROM "Jobs"
        LEFT JOIN "Contracts" C on C.id = "Jobs"."ContractId"
       WHERE paid is null AND "ClientId" = ${profileId} AND status != 'terminated'
    GROUP BY "ClientId"
    `,
      { type: QueryTypes.SELECT }
    );
  }

  getByIdWithContract(
    jobId: number,
    profileId: number
  ): Promise<JobEntity & { Contract: ContractEntity }> {
    return this.model.findOne({
      where: {
        id: jobId,
        paid: null,
      },
      include: [
        {
          model: models.Contracts,
          where: {
            status: { [Op.ne]: "terminated" },
            ClientId: profileId,
          },
          required: true,
        },
      ],
    });
  }

  setPaid(jobId: number, transactions: Transaction): Promise<JobEntity> {
    return this.model.update(
      {
        paid: true,
        paymentDate: Date.now(),
      },
      {
        where: {
          id: jobId,
        },
      },
      { transactions }
    );
  }
}
