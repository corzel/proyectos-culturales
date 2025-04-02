export function getEnv() {
  return {
    DATABASE_URL: process.env.DATABASE_URL,
    OPENROUTER_API_KEY: process.env.OPENROUTER_API_KEY,
    NODE_ENV: process.env.NODE_ENV,
  };
}

export type Env = ReturnType<typeof getEnv>;
