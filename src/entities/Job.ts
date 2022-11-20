type Entity = {
  id?: number;
  description?: string;
  price?: number;
  paid?: boolean;
  paymentDate?: Date;
};

export class JobEntity {
  id?: number;
  description?: string;
  price?: number;
  paid?: boolean;
  paymentDate?: Date;

  constructor(data: Entity) {
    const { id, description, paid, paymentDate, price } = data;
    this.id = id;
    this.description = description;
    this.paid = paid;
    this.price = price;
    this.paymentDate = paymentDate;
  }
}
