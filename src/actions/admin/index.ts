/* eslint-disable no-unused-vars */
"use server";

import { connectDB } from "@/lib/database/connect";
import { stripe } from "@/lib/stripe";
import Payment from "@/models/Payment.model";
import User from "@/models/User.model";
import { clerkClient } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import Stripe from "stripe";

export async function updateUserToAdmin({
    clerkID,
    payment_info,
    stripeID
}: {
    clerkID: string;
    stripeID: string;
    payment_info?: Stripe.Subscription;
}) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        session.startTransaction();
        await clerkClient.users.updateUser(clerkID, {
            createOrganizationEnabled: true,
            privateMetadata: {
                stripeID: stripeID,
                mongooseID: (await User.findOne({ clerkID: clerkID }))?.id
            }
        });
        await User.updateOne({ clerkID }, { role: "admin" });
        // let user = await User.findOne({ clerkID });
        // await Payment.create({
        //     paidBy: user?._id,
        //     status: "completed",
        //     payment_info: payment_info,
        //     package: payment_info.items.data[0].price.product as string,
        //     pricePerMonth: payment_info.items.data[0].price.unit_amount as number,
        //     amountPaid: payment_info.items.data[0].price.unit_amount as number
        // });
        await session.commitTransaction();
        return { status: 200, message: "User updated to admin" };
    }
    catch (error: any) {
        await session.abortTransaction();
        return { status: 500, message: "Internal Server Error " + error.message };
    } finally {
        session.endSession();
    }
}

export async function createUserAndMakeAdmin(data: {
    firstName: string;
    lastName: string;
    emailAddress: string;
    stripeID: string;
    payment_info?: Stripe.Subscription;
}) {
    const session = await mongoose.startSession();
    try {
        await connectDB();
        session.startTransaction();
        const user = await clerkClient.users.createUser({
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: [data.emailAddress],
        });
        const newUser = await User.create({
            clerkID: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.emailAddresses[0].emailAddress,
            photo: user.imageUrl,
            role: "admin"
        });
        await clerkClient.users.updateUser(user.id, {
            createOrganizationEnabled: true,
            privateMetadata: {
                mongooseID: newUser._id,
                stripeID: data.stripeID
            }
        });
        await stripe.customers.update(data.stripeID, {
            metadata: {
                clerkID: user.id,
                mongooseID: newUser._id as string
            }
        });
        // let pay = await Payment.create({
        //     paidBy: newUser._id,
        //     status: "completed",
        //     payment_info: data.payment_info,
        //     package: data.payment_info.items.data[0].price.product as string,
        //     pricePerMonth: data.payment_info.items.data[0].price.unit_amount as number,
        //     amountPaid: data.payment_info.items.data[0].price.unit_amount as number
        // });
        await session.commitTransaction();
        return { status: 200, message: "User created and updated to admin" };
    }
    catch (error: any) {
        await session.abortTransaction();
        return { status: 500, message: "Internal Server Error " + error.message };
    } finally {
        await session.endSession();
    }
}