import { models } from "../";
/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seedUp();

async function seedUp() {
  // create tables
  await models.Profiles.sync({ force: true });
  await models.Contracts.sync({ force: true });
  await models.Jobs.sync({ force: true });
  //insert data
  await Promise.all([
    models.Profiles.create({
      firstName: "Harry",
      lastName: "Potter",
      profession: "Wizard",
      balance: 1150,
      type: "client",
    }),
    models.Profiles.create({
      firstName: "Mr",
      lastName: "Robot",
      profession: "Hacker",
      balance: 231.11,
      type: "client",
    }),
    models.Profiles.create({
      firstName: "John",
      lastName: "Snow",
      profession: "Knows nothing",
      balance: 451.3,
      type: "client",
    }),
    models.Profiles.create({
      firstName: "Ash",
      lastName: "Kethcum",
      profession: "Pokemon master",
      balance: 1.3,
      type: "client",
    }),
    models.Profiles.create({
      firstName: "John",
      lastName: "Lenon",
      profession: "Musician",
      balance: 64,
      type: "contractor",
    }),
    models.Profiles.create({
      firstName: "Linus",
      lastName: "Torvalds",
      profession: "Programmer",
      balance: 1214,
      type: "contractor",
    }),
    models.Profiles.create({
      firstName: "Alan",
      lastName: "Turing",
      profession: "Programmer",
      balance: 22,
      type: "contractor",
    }),
    models.Profiles.create({
      firstName: "Aragorn",
      lastName: "II Elessar Telcontarvalds",
      profession: "Fighter",
      balance: 314,
      type: "contractor",
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "terminated",
      ClientId: 1,
      ContractorId: 5,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 1,
      ContractorId: 6,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 2,
      ContractorId: 6,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 2,
      ContractorId: 7,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "new",
      ClientId: 3,
      ContractorId: 8,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 3,
      ContractorId: 7,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 4,
      ContractorId: 7,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 4,
      ContractorId: 6,
    }),
    models.Contracts.create({
      terms: "bla bla bla",
      status: "in_progress",
      ClientId: 4,
      ContractorId: 8,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      ContractId: 1,
    }),
    models.Jobs.create({
      description: "work",
      price: 201,
      ContractId: 2,
    }),
    models.Jobs.create({
      description: "work",
      price: 202,
      ContractId: 3,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      ContractId: 4,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      ContractId: 7,
    }),
    models.Jobs.create({
      description: "work",
      price: 2020,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      ContractId: 7,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      ContractId: 2,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-16T19:11:26.737Z",
      ContractId: 3,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-17T19:11:26.737Z",
      ContractId: 1,
    }),
    models.Jobs.create({
      description: "work",
      price: 200,
      paid: true,
      paymentDate: "2020-08-17T19:11:26.737Z",
      ContractId: 5,
    }),
    models.Jobs.create({
      description: "work",
      price: 21,
      paid: true,
      paymentDate: "2020-08-10T19:11:26.737Z",
      ContractId: 1,
    }),
    models.Jobs.create({
      description: "work",
      price: 21,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      ContractId: 2,
    }),
    models.Jobs.create({
      description: "work",
      price: 121,
      paid: true,
      paymentDate: "2020-08-15T19:11:26.737Z",
      ContractId: 3,
    }),
    models.Jobs.create({
      description: "work",
      price: 121,
      paid: true,
      paymentDate: "2020-08-14T23:11:26.737Z",
      ContractId: 3,
    }),
  ]);
}

async function seedDown() {
  await models.Profiles.sync({ force: true });
  await models.Contracts.sync({ force: true });
  await models.Jobs.sync({ force: true });
}

export { seedUp, seedDown };
