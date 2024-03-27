import { z } from "zod";
import { SecretStoreOptionsSchema } from "./services/secrets/secretStore.server";
import { isValidRegex } from "./utils/regex";

const EnvironmentSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production"), z.literal("test")]),
  DATABASE_URL: z.string(),
  DATABASE_CONNECTION_LIMIT: z.coerce.number().int().default(10),
  DATABASE_POOL_TIMEOUT: z.coerce.number().int().default(60),
  DIRECT_URL: z.string(),
  SESSION_SECRET: z.string(),
  MAGIC_LINK_SECRET: z.string(),
  ENCRYPTION_KEY: z.string(),
  WHITELISTED_EMAILS: z
    .string()
    .refine(isValidRegex, "WHITELISTED_EMAILS must be a valid regex.")
    .optional(),
  REMIX_APP_PORT: z.string().optional(),
  LOGIN_ORIGIN: z.string().default("http://localhost:3030"),
  APP_ORIGIN: z.string().default("http://localhost:3030"),
  APP_ENV: z.string().default(process.env.NODE_ENV),
  SECRET_STORE: SecretStoreOptionsSchema.default("DATABASE"),
  POSTHOG_PROJECT_KEY: z.string().optional(),
  TELEMETRY_TRIGGER_API_KEY: z.string().optional(),
  TELEMETRY_TRIGGER_API_URL: z.string().optional(),
  HIGHLIGHT_PROJECT_ID: z.string().optional(),
  AUTH_GITHUB_CLIENT_ID: z.string().optional(),
  AUTH_GITHUB_CLIENT_SECRET: z.string().optional(),
  FROM_EMAIL: z.string().optional(),
  REPLY_TO_EMAIL: z.string().optional(),
  RESEND_API_KEY: z.string().optional(),
  PLAIN_API_KEY: z.string().optional(),
  RUNTIME_PLATFORM: z.enum(["docker-compose", "ecs", "local"]).default("local"),
  WORKER_SCHEMA: z.string().default("graphile_worker"),
  WORKER_CONCURRENCY: z.coerce.number().int().default(10),
  WORKER_POLL_INTERVAL: z.coerce.number().int().default(1000),
  EXECUTION_WORKER_CONCURRENCY: z.coerce.number().int().default(10),
  EXECUTION_WORKER_POLL_INTERVAL: z.coerce.number().int().default(1000),
  WORKER_ENABLED: z.string().default("true"),
  EXECUTION_WORKER_ENABLED: z.string().default("true"),
  TASK_OPERATION_WORKER_ENABLED: z.string().default("true"),
  TASK_OPERATION_WORKER_CONCURRENCY: z.coerce.number().int().default(10),
  TASK_OPERATION_WORKER_POLL_INTERVAL: z.coerce.number().int().default(1000),
  GRACEFUL_SHUTDOWN_TIMEOUT: z.coerce.number().int().default(60000),
  /** Optional. Only used if you use the apps/proxy */
  AWS_SQS_REGION: z.string().optional(),
  /** Optional. Only used if you use the apps/proxy */
  AWS_SQS_ACCESS_KEY_ID: z.string().optional(),
  /** Optional. Only used if you use the apps/proxy */
  AWS_SQS_SECRET_ACCESS_KEY: z.string().optional(),
  /** Optional. Only used if you use the apps/proxy */
  AWS_SQS_QUEUE_URL: z.string().optional(),
  AWS_SQS_BATCH_SIZE: z.coerce.number().int().optional().default(1),
  AWS_SQS_WAIT_TIME_MS: z.coerce.number().int().optional().default(100),
  DISABLE_SSE: z.string().optional(),

  // Redis options
  REDIS_HOST: z.string().optional(),
  REDIS_READER_HOST: z.string().optional(),
  REDIS_READER_PORT: z.coerce.number().optional(),
  REDIS_PORT: z.coerce.number().optional(),
  REDIS_USERNAME: z.string().optional(),
  REDIS_PASSWORD: z.string().optional(),
  REDIS_TLS_DISABLED: z.string().optional(),

  DEFAULT_ORG_EXECUTION_CONCURRENCY_LIMIT: z.coerce.number().int().default(10),
  DEFAULT_DEV_ENV_EXECUTION_ATTEMPTS: z.coerce.number().int().positive().default(1),

  TUNNEL_HOST: z.string().optional(),
  TUNNEL_SECRET_KEY: z.string().optional(),

  //API Rate limiting
  /**
   * @example "60s"
   * @example "1m"
   * @example "1h"
   * @example "1d"
   * @example "1000ms"
   * @example "1000s"
   */
  API_RATE_LIMIT_WINDOW: z.string().default("60s"),
  API_RATE_LIMIT_MAX: z.coerce.number().int().default(600),

  //v3
  V3_ENABLED: z.string().default("false"),
  OTLP_EXPORTER_TRACES_URL: z.string().optional(),
  LOG_TELEMETRY: z.string().default("true"),
  IMAGE_REGISTRY: z.string().default("docker.io"),
  IMAGE_REPO: z.string().default("task"),
  PROVIDER_SECRET: z.string().default("provider-secret"),
  COORDINATOR_SECRET: z.string().default("coordinator-secret"),
  DEPOT_TOKEN: z.string().optional(),
  DEPOT_PROJECT_ID: z.string().optional(),
  CONTAINER_REGISTRY_ORIGIN: z.string().optional(),
  CONTAINER_REGISTRY_USERNAME: z.string().optional(),
  CONTAINER_REGISTRY_PASSWORD: z.string().optional(),
  DEPLOY_REGISTRY_HOST: z.string().optional(),
  DEV_OTEL_EXPORTER_OTLP_ENDPOINT: z.string().optional(),
  OBJECT_STORE_BASE_URL: z.string().optional(),
  OBJECT_STORE_ACCESS_KEY_ID: z.string().optional(),
  OBJECT_STORE_SECRET_ACCESS_KEY: z.string().optional(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;
export const env = EnvironmentSchema.parse(process.env);
