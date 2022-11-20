import { JobsRepository } from "../repositories/jobs.repository";
import ProfileService from "./profile.service";
import { Transaction } from "sequelize";

class JobsService {
  private repository: JobsRepository;
  private profileService: ProfileService;

  constructor(repository: JobsRepository, profileService: ProfileService) {
    this.repository = repository;
    this.profileService = profileService;
  }

  public async getUnpaidJobs(profileId: number) {
    return this.repository.getUnpaidJobs(profileId);
  }

  public async getById(jobId: number) {
    return this.repository.findOne(jobId);
  }

  public async getByIdWithContract(jobId: number, profileId: number) {
    return this.repository.getByIdWithContract(jobId, profileId);
  }

  public async setPaid(job_id: number, transaction: Transaction) {
    return this.repository.setPaid(job_id, transaction);
  }

  public async paySalary(
    price: number,
    senderId: number,
    receiverId: number,
    transaction: Transaction
  ): Promise<boolean> {
    const canPay = await this.canPay(senderId, price);

    if (canPay) {
      await this.profileService.transferMoney(
        price,
        senderId,
        receiverId,
        transaction
      );
      return true;
    }
    return false;
  }

  private async canPay(profileId: number, price: number) {
    const { balance } = await this.profileService.getBalance(profileId);
    return Number(balance) > price;
  }

  public async canDeposit(profileId: number, amountToDeposit: number) {
    const [result] = await this.repository.getTotalUnpaidAmount(profileId);
    const { totalUnpaid } = result;
    return {
      canDeposit: amountToDeposit < (totalUnpaid * 25) / 100,
      totalUnpaid,
    };
  }
}

export default JobsService;
