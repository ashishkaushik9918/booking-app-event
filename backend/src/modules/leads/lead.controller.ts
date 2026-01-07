import { FastifyReply, FastifyRequest } from "fastify";
import { LeadServices } from "./lead.services";
import { BaseController } from "../base.controller";
export class LeadController extends BaseController {
    createLeads = async (request: FastifyRequest, response: FastifyReply) => { }
    getLeads = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const result = await LeadServices.getLeads();
            const leads = ['Ashish', 'verma'];
            const fastify = request.server;
            const user = request.user;
            fastify.io.to(`user:${user.sub}`)
                .emit("lead:created", {
                    leads,
                    createdBy: "Ashish verma",
                });
            return this.created(response, {
                message: "Leads fetched successfully",
                data: result,
            });
        } catch (error: any) {
            console.log(error);
            return this.fail(response, error, "Failed to fetch leads");
        }
    };

    updateLeadDetails = async (request: FastifyRequest, response: FastifyReply) => { }

    updateLeadStatus = async (request: FastifyRequest, response: FastifyReply) => { }

    deleteLeads = async (request: FastifyRequest, response: FastifyReply) => { }

    exportLeads = async (request: FastifyRequest, response: FastifyReply) => { }

    importBulkLeads = async (request: FastifyRequest, response: FastifyReply) => { }

    deleteBulkLeads = async (request: FastifyRequest, response: FastifyReply) => { }
}

// AshishVerma @2026##@!