import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekPendingGoals } from "../../functions/get-week-pending-goals";

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/pending-goals", async (request, reply) => {
    try {
      const { pendingGoals } = await getWeekPendingGoals();

      return reply.code(200).send(pendingGoals);
    } catch (error) {
      if (error instanceof Error) {
        return reply.code(500).send({
          message: "Erro interno do servidor",
          errorMessage: error.message,
        });
      }
    }
  });
};
