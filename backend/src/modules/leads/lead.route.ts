import { LeadController } from "./lead.controller";
import { FastifyInstance } from "fastify";
import { authGuard } from "../../plugins/auth.guard";

export default async function LeadRoutes(route: FastifyInstance) {
    const controller = new LeadController;
    route.get("/get-leads", { preHandler: authGuard }, controller.getLeads);
}