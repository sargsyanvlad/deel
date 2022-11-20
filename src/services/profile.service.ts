import { ProfilesRepository } from "../repositories/profile.repository";
import { Transaction } from "sequelize";

class ProfileService {
  private repository: ProfilesRepository;
  constructor(repository: ProfilesRepository) {
    this.repository = repository;
  }

  public async getBalance(profileId: number) {
    return this.repository.getBalance(profileId);
  }

  public async transferMoney(
    price: number,
    senderId: number,
    receiverId: number,
    transaction: Transaction
  ) {
    await this.repository.withdrawBalance(senderId, price, transaction);
    await this.repository.fillBalance(receiverId, price, transaction);
  }

  public async deposit(
    amount: number,
    receiverId: number,
    transaction: Transaction
  ) {
    await this.repository.fillBalance(receiverId, amount, transaction);
  }

  public getTotalEarnedProfessions(start: string, end: string) {
    return this.repository.getTotalEarnedProfessions(start, end);
  }

  public getBestClients(start: string, end: string, limit: string) {
    return this.repository.getBestClients(start, end, limit);
  }
}

export default ProfileService;
