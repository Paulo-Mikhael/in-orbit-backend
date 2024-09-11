import { defineConfig } from "drizzle-kit";
import { env } from "./src/env";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./.migrations", // Arquivo onde vai ficar as migrations
  dialect: "postgresql", // Banco de dados desejado
  dbCredentials: {
    //Conexão com o banco de dados
    url: env.DATABASE_URL,
  },
});
