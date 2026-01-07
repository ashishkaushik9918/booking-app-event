import { LeadCreateDTO } from "./dto/create-lead.dto";

export class LeadServices {
    static async createLeads(payload: LeadCreateDTO): Promise<LeadCreateDTO> {
        throw new Error("ehgerger");
    }
    static async getLeads(filters?: Record<string, string>) {
        return ['ashish']
    }
}