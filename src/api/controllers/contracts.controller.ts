import { RequestHandler, Request } from "express";
import ContractsService from "../../services/contracts.service";
import { logger } from "../../utils";

class ContractsController {
  private contractsService: ContractsService;

  constructor(contractsService: ContractsService) {
    this.contractsService = contractsService;
  }

  getAllContracts: RequestHandler = async (
    req: Request & { profile: { id } },
    res
  ) => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const contracts = await this.contractsService.listOwn(
        Number(limit),
        Number(offset),
        req.profile.id
      );
      res.send({ result: contracts });
    } catch (err) {
      logger.error("Failed getAllContracts", err);
      res.status(400).send("Something went wrong");
    }
  };

  getById: RequestHandler = async (req: Request & { profile: { id } }, res) => {
    try {
      const { id } = req.params;
      const contract = await this.contractsService.getById(
        Number(id),
        req.profile.id
      );
      res.send({ result: contract });
    } catch (err) {
      logger.error("Failed getById", err);
      res.status(400).send("Something went wrong");
    }
  };
}

export default ContractsController;
