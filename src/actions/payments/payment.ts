"use server";

import { connectDB } from "@/lib/database/connect";
import { packages } from "@/lib/packages";
import Invoice from "@/models/Invoice.model";
import Payment from "@/models/Payment.model";
import { InvoiceI } from "@/types/payments";
import mongoose from "mongoose";

export async function createPayment(payeeID: string, custID: string, amount: number) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        await Payment.create({
            payeeID: payeeID,
            custID: custID,
            amount: amount,
            status: "initiated"
        });
        mongooseSession.commitTransaction();
        return { status: 200, message: "Payment initiated successfully" };
    } catch (err: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error " + err.message };
    }
    finally {
        mongooseSession.endSession();
    }
}

export async function createInvoice(details: InvoiceI) {
    await connectDB();
    const mongooseSession = await mongoose.startSession();
    try {
        mongooseSession.startTransaction();
        if (details.amount === details.amount_captured) {
            let pack = packages.find((p) => p.price * 100 === details.amount)?.package as string;
            await Invoice.create({
                paidBy: details.paidBy,
                amount: details.amount,
                amount_captured: details.amount_captured,
                billing_details: details.billing_details,
                status: "paid",
                package: pack,
            });
            await Payment.updateOne({ payeeID: details.paidBy }, { status: "paid" });
            mongooseSession.commitTransaction();
            return { status: 200, message: "Invoice created successfully" };
        } else {
            mongooseSession.abortTransaction();
            return { status: 400, message: "Amount mismatch" };
        }
    } catch (err: any) {
        mongooseSession.abortTransaction();
        return { status: 500, message: "Internal Server Error " + err.message };
    }
    finally {
        mongooseSession.endSession();
    }
}