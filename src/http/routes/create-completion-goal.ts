import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoalCompletion } from "../../functions/create-goal-completion";

export const createCompletionGoalRoute: FastifyPluginAsyncZod = async (app) => {
  const bodySchema = z.object({
    goalId: z.string(),
  });

  app.post("/completions", async (request, reply) => {
    try {
      const { goalId } = bodySchema.parse(request.body);

      const goal = await createGoalCompletion({
        goalId,
      });

      if (goal === "finished") {
        return reply.code(403).send({ message: "A meta foi atingida" });
      }

      const goalHour = goal.goalCompletion.createdAt.getHours();
      const goalMinutes = goal.goalCompletion.createdAt.getMinutes();

      return reply.code(201).send({
        message: `Meta completa às ${goalHour}:${goalMinutes}`,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      if (error instanceof Error) {
        return reply.code(500).send({
          message: "Erro interno do servidor",
          errorMessage: error.message,
        });
      }
    }
  });
};
