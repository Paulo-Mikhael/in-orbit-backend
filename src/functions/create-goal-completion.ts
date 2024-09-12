import { and, gte, lte, count, sql, eq } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";
import dayjs from "dayjs";

interface CreateGoalCompletionRequest {
  goalId: string;
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest) {
  const firstDayOfWeek = dayjs().startOf("week").toDate(); // Primeiro dia da semana (segunda da semana atual)
  const lastDayOfWeek = dayjs().endOf("week").toDate(); // Último dia da semana (domingo da semana atual)

  const goalsCompletionCounts = db.$with("goals_completion-counts").as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as("completionCount"),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek),
          eq(goalCompletions.goalId, goalId)
        )
      ) // and => todas as condições que especificadas devem ser verdadeiras, gte => greater than or equal
      .groupBy(goalCompletions.goalId)
  );

  const result = await db
    .with(goalsCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql /*sql*/`
    COALESCE(${goalsCompletionCounts.completionCount}, 0) /*Escreve um valor padrão caso o valor for nulo*/
  `.mapWith(Number),
    })
    .from(goals)
    .leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id))
    .where(eq(goals.id, goalId));

  const { completionCount, desiredWeeklyFrequency } = result[0];

  if (completionCount >= desiredWeeklyFrequency) {
    throw new Error("Goal already finished this week");
  }

  const insertResult = await db
    .insert(goalCompletions)
    .values({ goalId })
    .returning();
  const goalCompletion = insertResult[0];

  return {
    goalCompletion,
  };
}
