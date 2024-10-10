import { packages } from "@/lib/packages";
import mongoose, { Schema, Document, models } from "mongoose";

export interface InvoiceType extends Document {
    paidBy: mongoose.Schema.Types.ObjectId;
    amount: Number,
    amount_captured: Number,
    billing_details: Object,
    status: String,
    package: String,
}

const InvoiceSchema: Schema<InvoiceType> = new mongoose.Schema({
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    amount: {
        type: Number,
        required: true,
    },
    amount_captured: {
        type: Number,
        required: true,
    },
    billing_details: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        enum: ["invalid", "initiated", "pending", "paid", "failed"],
        default: "invalid",
        required: true
    },
    package: {
        type: String,
        enum: packages.map((p) => p.package),
        required: true,
    },
});

const Invoice = models.Invoice as mongoose.Model<InvoiceType> || mongoose.model<InvoiceType>("Invoice", InvoiceSchema);

export default Invoice;