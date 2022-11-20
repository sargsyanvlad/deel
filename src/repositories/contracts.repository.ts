import { BaseRepository } from "./base.repository";
import { ContractEntity } from "../entities/Contract";
import { Op } from "sequelize";
import { GenericObject } from "../types";

export class ContractsRepository extends BaseRepository<ContractEntity> {
  findAll(): Promise<ContractEntity[]> {
    return this.model.findAll();
  }

  findById(id: number, profileId: number): Promise<ContractEntity> {
    return this.model.findOne({
      where: {
        id,
        [Op.or]: {
          ClientId: profileId,
          ContractorId: profileId,
        },
      },
    });
  }

  // NOTE we can have both approaches, from defining generic where, for each repo method,
  // until getting exact fields to filter as written above
  findWithPagination(
    limit = 10,
    offset = 0,
    where: GenericObject
  ): Promise<ContractEntity[]> {
    return this.model.findAll({
      where: { ...where },
      limit,
      offset,
    });
  }
}
