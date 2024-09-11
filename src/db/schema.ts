import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

// npx drizzle-kit generate => Cria uma migration
// npx drizzle-kit migrate => Aplica as migrations no banco de dados
// npx drizzle-kit studio => Abre uma tela de gerenciamento das tabelas
export const goals = pgTable("goals", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  desiredWeeklyFrequency: integer("desired_weekly_frequency").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
