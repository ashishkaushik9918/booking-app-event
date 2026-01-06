import { FastifyInstance } from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

export async function swagger(app: FastifyInstance) {
    const port = Number(process.env.PORT) || 8000
    app.register(fastifySwagger, {
        openapi: {
            info: {
                title: 'BOOKING APPLICATION API DOCS SWAGGER',
                description: 'BOOKING APPLICATION API Documentation',
                version: '1.0.0'
            },
            servers: [{ url: `http://localhost:8080` }],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer'
                    }
                }
            },
            tags: [
                {
                    name: 'Bookings',
                    description: 'Bookings endpoints'
                },
                {
                    name: 'Auth',
                    description: 'Auth endpoints'
                }
            ]
        }
    });

    app.register(fastifySwaggerUi, {
        routePrefix: '/docs',
        uiConfig: {
            docExpansion: 'full',
            deepLinking: false
        },
        uiHooks: {
            onRequest: function (_request, _reply, next) {
                next();
            },
            preHandler: function (_request, _reply, next) {
                next();
            }
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject) => {
            return swaggerObject;
        },
        transformSpecificationClone: true
    });
}
