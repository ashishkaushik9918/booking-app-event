import { FastifyReply } from "fastify";
import { HttpError } from "../exceptions/http-error";

export abstract class BaseController {
    protected ok(
        reply: FastifyReply,
        data: unknown = null,
        message = "Success",
        statusCode = 200
    ) {
        return reply.status(statusCode).send({
            success: true,
            message,
            data,
            statusCode,
        });
    }

    protected created(
        reply: FastifyReply,
        data: unknown,
        message = "Created successfully"
    ) {
        return this.ok(reply, data, message, 201);
    }

    protected fail(
        reply: FastifyReply,
        error: unknown,
        fallbackMessage = "Something went wrong"
    ) {
        if (error instanceof HttpError) {
            return reply.status(error.statusCode).send({
                success: false,
                message: error.message,
                code: error.code,
                statusCode: error.statusCode,
            });
        }

        // Unknown error
        return reply.status(500).send({
            success: false,
            message: fallbackMessage,
            statusCode: 500,
        });
    }
}
