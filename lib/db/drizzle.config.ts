import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    host: "ep-rapid-unit-b4wnpi64.c-6.us-east-2.aws.neon.tech",
    user: "neondb_owner",
    password: "npg_4KcGihTWDsb1",
    database: "neondb",
    ssl: true,
  },
});
