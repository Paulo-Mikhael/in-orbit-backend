import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(), // Define que DATABASE_URL é uma string e url
});

export const env = envSchema.parse(process.env); // Verifica se o conteúdo do arquivo .env do projeto é compatível com o envSchema
