import { app } from "../server";
import chai from "chai";
import { before } from "mocha";
const { expect } = chai;
import chaiHttp from "chai-http";
import { seedUp, seedDown } from "../db/seeds/seedDb";

describe("API tests", () => {
  before(async () => {
    chai.use(chaiHttp);
    await seedUp();
  });

  describe("GET /health", () => {
    it("Should return health", async () => {
      const res = await chai.request(app).get("/health");
      expect(res.status).to.be.equal(200);
    });
  });

  describe("GET /list", async () => {
    it("Should return 404 not found ", async () => {
      const res = await chai.request(app).get("/list");
      expect(res.status).to.be.equal(404);
    });
  });

  describe("GET /api/admin/best-clients", async () => {
    it("Should return 200 with list of Best Client ", async () => {
      const res = await chai.request(app).get("/api/admin/best-clients");
      expect(res.status).to.be.equal(200);
      expect(res).to.haveOwnProperty("body");
      expect(res.body).to.be.a("array");
    });
  });

  after(async () => {
    await seedDown();
  });
});
