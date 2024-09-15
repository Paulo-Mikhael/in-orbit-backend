import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";
import { createGoal } from "../../functions/create-goal";

export const createGoalRoute: FastifyPluginAsyncZod = async (app) => {
  const bodySchema = z.object({
    title: z.string(),
    desiredWeeklyFrequency: z.number().int().min(1).max(7),
  });

  app.post("/goals", async (request, reply) => {
    try {
      const body = bodySchema.parse(request.body);

      // Cria o objetivo se os dados forem válidos
      await createGoal({
        title: body.title,
        desiredWeeklyFrequency: body.desiredWeeklyFrequency,
      });

      return reply.status(201).send({ message: "Meta criada com sucesso" });
    } catch (error) {
      // Captura e personaliza os erros de validação do Zod
      if (error instanceof z.ZodError) {
        return reply.status(400).send({
          message: "Dados inválidos",
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }

      // Captura qualquer outro tipo de erro e retorna um erro genérico
      return reply.status(500).send({ message: "Erro interno do servidor" });
    }
  });
};
