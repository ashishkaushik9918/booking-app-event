import { FastifyRequest, FastifyReply } from "fastify";

export async function createUser(
    request: FastifyRequest,
    reply: FastifyReply
) {

    return reply.code(201).send({
        message: "User created",
        data: request.body
    });
}
