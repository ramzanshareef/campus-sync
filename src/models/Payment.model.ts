import { packages } from "@/lib/packages";
import mongoose, { Schema, Document, models } from "mongoose";

export interface PaymentType extends Document {
    paidBy: mongoose.Schema.Types.ObjectId;
    status: string;
    payment_info: object;
    package: string;
    pricePerMonth: number;
    amountPaid: number;
}

const PaymentSchema: Schema<PaymentType> = new mongoose.Schema({
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        required: true,
        enum: ["invalid", "initiated", "pending", "completed", "failed"],
        default: "invalid"
    },
    package: {
        type: String,
        enum: packages.map((p) => p.package),
    },
    pricePerMonth: {
        type: Number,
        enum: packages.map((p) => p.pricePerMonth),
    },
    amountPaid: {
        type: Number,
    },
    payment_info: {
        type: Object,
    },
});

const Payment = models.Payment as mongoose.Model<PaymentType> || mongoose.model<PaymentType>("Payment", PaymentSchema);

export default Payment;