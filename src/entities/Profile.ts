type Entity = {
  id?: number;
  firstName?: string;
  lastName?: string;
  profession?: string;
  balance?: string;
  type?: string;
};

export class ProfileEntity {
  id?: number;
  firstName?: string;
  lastName?: string;
  profession?: string;
  balance?: string;
  type?: string;

  constructor(data: Entity) {
    const { id, firstName, lastName, profession, balance, type } = data;
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.profession = profession;
    this.balance = balance;
    this.type = type;
  }
}
