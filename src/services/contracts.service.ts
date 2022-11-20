import { ContractsRepository } from "../repositories/contracts.repository";
import { Op } from "sequelize";

class ContractsService {
  private repository: ContractsRepository;
  constructor(repository: ContractsRepository) {
    this.repository = repository;
  }

  public async getById(id: number, profileId: number) {
    return this.repository.findById(id, profileId);
  }

  public async listOwn(limit: number, offset: number, profileId: number) {
    if (limit || offset) {
      return this.repository.findWithPagination(limit, offset, {
        status: { [Op.ne]: "terminated" },
        [Op.or]: [
          {
            ClientId: profileId,
          },
          {
            ContractorId: profileId,
          },
        ],
      });
    }
    return this.repository.findAll();
  }
}

export default ContractsService;
