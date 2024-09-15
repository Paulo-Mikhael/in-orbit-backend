import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);
  const startOfWeek = dayjs().startOf("week");

  const result = await db
    .insert(goals)
    .values([
      {
        title: "Acordar cedo",
        desiredWeeklyFrequency: 5,
      },
      {
        title: "Me exercitar",
        desiredWeeklyFrequency: 3,
      },
      {
        title: "Meditar",
        desiredWeeklyFrequency: 1,
      },
    ])
    .returning();

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.add(1, "day").hour(6).toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.hour(16).toDate(),
    },
  ]);
}

seed().finally(() => client.end());
