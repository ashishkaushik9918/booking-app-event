import { Queue } from "bullmq";
import { redisConnection } from "../config/bullmq";

export const leadQueue = new Queue("lead-events", {
    connection: redisConnection as any
});
