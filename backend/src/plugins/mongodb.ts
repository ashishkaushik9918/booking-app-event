import { FastifyInstance } from "fastify";
import mongoose from "mongoose";

export default async function mongodb(app: FastifyInstance) {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/travel_bookings";
    try {
        if (process.env.NODE_ENV === "development") {
            mongoose.set("autoIndex", true);
        } else {
            mongoose.set("autoIndex", false);
        }
        await mongoose.connect(uri, {
            autoIndex: false,
        });

        app.log.info("MongoDB connected");

        app.addHook("onClose", async () => {
            await mongoose.connection.close();
            app.log.info("MongoDB disconnected");
        });
    } catch (err) {
        app.log.error(err, "MongoDB connection failed");
        process.exit(1);
    }
}
