import { BaseRepository } from "./base.repository";
import { ProfileEntity } from "../entities/Profile";
import { QueryTypes, Transaction } from "sequelize";

export class ProfilesRepository extends BaseRepository<ProfileEntity> {
  findOne(id: number): Promise<ProfileEntity> {
    return this.model.findOne(id);
  }

  findAll(): Promise<ProfileEntity[]> {
    return this.model.findAll();
  }

  getBalance(profileId: number): Promise<Pick<ProfileEntity, "balance">> {
    return this.model.findOne({
      where: {
        id: profileId,
      },
      attributes: ["balance"],
    });
  }

  withdrawBalance(
    id: number,
    amount: any,
    transaction: Transaction
  ): Promise<boolean> {
    return this.model.update(
      {
        balance: this.sequelize.literal(`"balance" -${amount}`),
      },
      { where: { id } },

      { transaction }
    );
  }

  fillBalance(
    id: number,
    amount: any,
    transaction: Transaction
  ): Promise<boolean> {
    return this.model.update(
      {
        balance: this.sequelize.literal(`"balance" +${amount}`),
      },
      { where: { id } },
      { transaction }
    );
  }

  getTotalEarnedProfessions(start: string, end: string) {
    const where = {};
    if (start && end) {
      where["createdAt"] = {
        [this.Op.gte]: start,
        [this.Op.lte]: end,
      };
    }

    return this.model.findAll({
      where,
      attributes: [
        "profession",
        [
          this.sequelize.fn("SUM", this.sequelize.col("balance")),
          "totalEarned",
        ],
      ],
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["totalEarned", "DESC"],
      ],
      group: ["Profiles.profession"],
    });
  }
  getBestClients(start: string, end: string, limit: string) {
    const where = {};
    if (start && end) {
      where["createdAt"] = {
        [this.Op.gte]: start,
        [this.Op.lte]: end,
      };
    }

    if (limit) {
      where["limit"] = limit;
    }

    return this.sequelize.query(
      `
            SELECT 
              SUM(price) as paid,
              "ClientId" as id,
              CONCAT(Clientes."firstName", ' ', Clientes."lastName") as fullName
            FROM "Jobs"
              LEFT JOIN "Contracts" JobContracts ON JobContracts.id = "Jobs"."ContractId"
              LEFT JOIN "Profiles" Clientes ON Clientes.id = JobContracts."ClientId"
            WHERE paid = true
            GROUP BY "ClientId", Clientes.id`,
      { type: QueryTypes.SELECT }
    );
  }
}
