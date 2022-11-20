import { app } from "./server";
const port = process.env.APP_PORT || 3000;
import { logger } from "./utils";

export const bootsrap = () => {
  try {
    app.listen(port, () => {
      logger.info(`Server running at port:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

bootsrap();
