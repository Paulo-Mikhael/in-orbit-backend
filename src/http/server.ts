import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createGoalRoute } from "./routes/create-goal";
import { createCompletionGoalRoute } from "./routes/create-completion-goal";
import { getPendingGoalsRoute } from "./routes/get-pending-goals";
import { getWeekSummaryRoute } from "./routes/get-week-summary";
import fastifyCors from "@fastify/cors";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: "*",
});

app.register(swagger, {
  swagger: {
    info: {
      title: "API Documentation",
      description: "API documentation for your project",
      version: "1.0.0",
    },
    host: "localhost:3333",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs", // URL para acessar a documentação
  swagger: {
    info: {
      title: "API Documentation",
      version: "1.0.0",
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP server running!");
  });

app.register(createGoalRoute);
app.register(createCompletionGoalRoute);
app.register(getPendingGoalsRoute);
app.register(getWeekSummaryRoute);
