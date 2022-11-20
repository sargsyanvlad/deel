type Contract = {
  id?: number;
  terms?: string;
  status?: string;
  ContractorId?: number;
  ClientId?: number;
};

export class ContractEntity {
  id?: number;
  terms?: string;
  status?: string;
  ContractorId?: number;
  ClientId?: number;

  constructor(data: Contract) {
    const { id, terms, status, ClientId, ContractorId } = data;
    this.id = id;
    this.status = status;
    this.terms = terms;
    this.ContractorId = ContractorId;
    this.ClientId = ClientId;
  }
}
