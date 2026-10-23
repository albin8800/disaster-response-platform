import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Disaster Response - SMS Service",
      version: "1.0.0",
      description:
        "Microservice for dispatching emergency disaster SMS alerts.",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local / Docker Container",
      },
    ],
  },
  // Tells swagger-jsdoc where to scan for route annotations
  apis: ["./src/routes/*.ts", "./dist/routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
