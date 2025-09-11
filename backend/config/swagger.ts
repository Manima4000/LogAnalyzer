import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const PORT = process.env.PORT

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Blue Team API',
    version: '1.0.0',
    description: 'Documentação da API voltada para segurança da informação',
  },
  servers: [
    {
      url: `http://localhost:4000`,
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.ts'], // Caminho dos arquivos com comentários Swagger
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
