import Fastify from "fastify";
import dotenv from "dotenv";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";
import { appOptions } from "../config/app.config";
import { swagger } from "../plugins/swagger";
import { Authenticator } from '@fastify/passport'
dotenv.config({ debug: false });
export async function buildApp() {
    const fastifyPassport = new Authenticator()
    const app = Fastify(appOptions).withTypeProvider<ZodTypeProvider>();
    app.setValidatorCompiler(validatorCompiler);
    app.setSerializerCompiler(serializerCompiler)


    return app;
}
