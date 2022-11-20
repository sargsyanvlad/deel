import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "debug",
  format: winston.format.json(),
  defaultMeta: { service: process.env.INCARD_SERVICE_NAME },
  transports: [new winston.transports.Console()],
});
