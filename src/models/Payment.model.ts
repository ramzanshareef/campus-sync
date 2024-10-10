import mongoose, { Document, Schema } from "mongoose";


export interface PaymentType extends Document {
    payeeID: mongoose.Schema.Types.ObjectId;
    custID: String,
    amount: Number,
    status: String,
}

const PaymentSchema: Schema<PaymentType> = new mongoose.Schema({
    payeeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    custID: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["invalid", "initiated", "pending", "paid", "failed"],
        default: "invalid",
        required: true
    },
});

const Payment = mongoose.models.Payment as mongoose.Model<PaymentType> || mongoose.model<PaymentType>("Payment", PaymentSchema);

export default Payment;