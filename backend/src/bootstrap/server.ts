import { buildApp } from "./app";
import { FastifyInstance, FastifyRequest, FastifyReply, FastifyError, errorCodes } from "fastify";
import cors from "../plugins/cors";
import env from "../plugins/env";
import routes from "../routes";
import sensible from "@fastify/sensible";
import helmet from "@fastify/helmet";
import rateLimitPlugin from "../plugins/rate-limit";
import jwtPlugin from "../plugins/jwt";
import authHook from "../hooks/auth";
import mongodb from "../plugins/mongodb";
import { swagger } from "../plugins/swagger";
import fastifyCookie from "@fastify/cookie";
import { HttpError } from "../exceptions/http-error";


const bootStrapApplication = async () => {
    const app: FastifyInstance = await buildApp();
    await setUpExceptionHandler(app);
    await setUpApplication(app);
    try {
        await startAppListen(app);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};
bootStrapApplication();

export async function setUpApplication(app: FastifyInstance) {

    app.register(fastifyCookie, {
        secret: process.env.COOKIE_SECRET,
    });
    await setUpExceptionHandler(app);
    await setUpHelmet(app);
    await setUpPlugins(app);
    await app.register(mongodb);
    await setUpRoutes(app);
    await setUpRateLimit(app);
    await app.register(swagger)


}


export async function setUpPlugins(app: FastifyInstance) {
    await app.register(env);
    await app.register(cors);
    await app.register(routes);
    await app.register(jwtPlugin);
    await setUpHooks(app);



}
export async function setUpRoutes(app: FastifyInstance) {
    await app.register(sensible);
}


export async function setUpHooks(app: FastifyInstance) {
    app.register(authHook);
}

export async function setUpRateLimit(app: FastifyInstance) {
    app.register(rateLimitPlugin);
}

export async function setUpHelmet(app: FastifyInstance) {
    await app.register(helmet, {
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "https://cdn.jsdelivr.net"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                imgSrc: ["'self'", "data:"]
            }
        }
    });
}



export async function setUpExceptionHandler(app: FastifyInstance) {
    app.setErrorHandler(
        (
            error: FastifyError | HttpError | any,
            request: FastifyRequest,
            reply: FastifyReply
        ) => {
            if (error.validation) {
                const errors = error.validation.map((issue: any) => ({
                    field:
                        issue.instancePath?.replace("/", "") ||
                        issue.params?.missingProperty ||
                        "body",
                    message: issue.message,
                }));

                return reply.status(400).send({
                    success: false,
                    message: "Validation failed",
                    code: "VALIDATION_ERROR_CODE",
                    errors,
                });
            }
            if (error instanceof HttpError) {
                return reply.status(error.statusCode).send({
                    success: false,
                    message: error.message,
                    details: error.details,
                    code: error.code,
                });
            }
            if (error.statusCode && error.statusCode < 500) {
                return reply.status(error.statusCode).send({
                    success: false,
                    message: error.message,
                    code: error.code,
                });
            }

            request.log.error(
                {
                    err: error,
                    url: request.url,
                    method: request.method,
                    ip: request.ip,
                },
                "Unhandled exception"
            );
            return reply.status(500).send({
                success: false,
                message: "Internal Server Error",
                code: "INTERNAL_SERVER_ERROR"
            });
        }
    );
}



export async function startAppListen(app: FastifyInstance) {
    const port = Number(process.env.PORT) || 8000
    await app.listen({ port: port, host: '0.0.0.0' });
    app.log.info(` Server running at http://localhost:${port}`);
    app.log.info(`Swagger UI at http://localhost:${port}/docs`);
}

