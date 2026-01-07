import mongoose, { Schema, Document, Types } from "mongoose";
export interface IAttendee extends Document {
    booking: Types.ObjectId;
    event: Types.ObjectId;
    ticket: Types.ObjectId;

    name: string;
    email: string;
    phone?: string;

    qrCode: string;
    checkedIn: boolean;
    checkedInAt?: Date;
}

const AttendeeSchema = new Schema<IAttendee>(
    {
        booking: { type: Schema.Types.ObjectId, ref: "Booking", required: true },
        event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
        ticket: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },

        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: String,

        qrCode: { type: String, required: true, unique: true },
        checkedIn: { type: Boolean, default: false },
        checkedInAt: Date,
    },
    { timestamps: true }
);

export const AttendeeModel = mongoose.model<IAttendee>("Attendee", AttendeeSchema);

