import dayjs from "dayjs";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../db";
import { goalCompletions, goals } from "../db/schema";

export async function getWeekPendingGoals() {
  const firstDayOfWeek = dayjs().startOf("week").toDate(); // Primeiro dia da semana (segunda da semana atual)
  const lastDayOfWeek = dayjs().endOf("week").toDate(); // Último dia da semana (domingo da semana atual)

  const goalsCreatedUpToWeek = db.$with("goals_created_up_to_week").as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  ); // lte => lower than or equal

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
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      ) // and => todas as condições que especificadas devem ser verdadeiras, gte => greater than or equal
      .groupBy(goalCompletions.goalId)
  );

  const pendingGoals = await db
    .with(goalsCreatedUpToWeek, goalsCompletionCounts)
    .select({
      id: goalsCreatedUpToWeek.id,
      title: goalsCreatedUpToWeek.title,
      desiredWeeklyFrequency: goalsCreatedUpToWeek.desiredWeeklyFrequency,
      completionCount: sql /*sql*/`
        COALESCE(${goalsCompletionCounts.completionCount}, 0)
      `.mapWith(Number),
    })
    .from(goalsCreatedUpToWeek)
    .leftJoin(
      goalsCompletionCounts,
      eq(goalsCompletionCounts.goalId, goalsCreatedUpToWeek.id)
    );

  return {
    pendingGoals,
  };
}
