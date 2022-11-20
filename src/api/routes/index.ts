import * as express from "express";
const apiRouter = express.Router();

import { jobRouter } from "./jobs";
import { adminRouter } from "./admin";
import { balancesRouter } from "./balances";
import { contractRouter } from "./contracts";

apiRouter.use("/jobs", jobRouter);
apiRouter.use("/admin", adminRouter);
apiRouter.use("/balance", balancesRouter);
apiRouter.use("/contracts", contractRouter);

export { apiRouter };
