import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { getWeekSummary } from "../../functions/get-week-summary";

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async (app) => {
  app.get("/week", async (request, reply) => {
    try {
      const { summary } = await getWeekSummary();

      return reply.code(200).send({ summary });
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
