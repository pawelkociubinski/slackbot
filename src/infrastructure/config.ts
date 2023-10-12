import dotenv from "dotenv";
import Pino from "pino";
import PinoHttp from "pino-http";
import z from "zod";

dotenv.config();

export const logger = Pino.default();
export const httpLogger = PinoHttp.default({
  logger,
});

const ENVSchema = z.object({
  GITHUB_TOKEN: z.string(),
  REPO_OWNER: z.string(),
  REPO_NAME: z.string(),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  npm_package_name: z.string(),
  npm_package_version: z.string(),
  PORT: z.coerce.number().default(3000),
});

export const parsedENV = ENVSchema.safeParse(process.env);

if (!parsedENV.success) {
  logger.error(parsedENV.error.issues);
  process.exit(1);
}

export const config = parsedENV.data;

// https://www.youtube.com/watch?v=q1im-hMlKhM
// https://twitter.com/mattpocockuk/status/1615110808219918352?lang=en&ref=catalins.tech
type ENVSchemaType = z.infer<typeof ENVSchema>;

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ENVSchemaType {}
  }
}

declare module "express-serve-static-core" {
  interface Request {
    context: {
      log: (...args: any[]) => void;
    };
  }
}
