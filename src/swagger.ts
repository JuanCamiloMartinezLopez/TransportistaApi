import swaggerJSDoc, { SwaggerDefinition } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Transportista API',
      version: '1.0.0'
    }
  }
  //apis: ["./src/interface/routes/*.ts"],
};

const swaggerDefinition: SwaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Transportista API',
    version: '1.0.0',
    description: 'Documentación de la API Transportista API con Swagger y Inversify'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor de desarrollo'
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{ BearerAuth: [] }]
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ['./src/api/**/*.ts'] // Archivos donde están los endpoints
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

function setupSwagger(app: express.Application) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

export { setupSwagger };
