import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { StripeWebHookSecret } from "@/lib/constants";
import User from "@/models/User.model";
import { createUserAndMakeAdmin, updateUserToAdmin } from "@/actions/admin/index";
import { connectDB } from "@/lib/database/connect";
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            StripeWebHookSecret
        );
    }
    catch (error: any) {
        return Response.json({ error: error.message }, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    try {
        if (event.type === "customer.subscription.created") {
            await connectDB();
            const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer;
            let existingUser = await User.findOne({ email: customer.email as string });
            if (existingUser !== null) {
                await updateUserToAdmin({
                    clerkID: existingUser.clerkID,
                    stripeID: event.data.object.id as string
                    // payment_info: session.subscription as Stripe.Subscription,
                    // TODO: Handling Payment Info
                });
            }
            else {
                await createUserAndMakeAdmin({
                    emailAddress: customer.email as string,
                    firstName: customer?.name?.split(" ")[0] as string,
                    lastName: customer?.name?.split(" ")[1] as string,
                    stripeID: customer.id,
                    // payment_info: session.subscription as Stripe.Subscription
                });
            }
        }
        if (event.type === "customer.subscription.deleted") {
            await connectDB();
            const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer;
            let user = await User.findOne({ email: customer.email as string });
            if (user !== null) {
                user.role = "user";
                await user?.save();
                await clerkClient.users.updateUser(user?.clerkID as string, {
                    privateMetadata: {
                        stripeID: null,
                        mongooseID: user?.id as string
                    }
                });
            }
        }
        return Response.json({});
    }
    catch (error: any) {
        return Response.json({ error: error.message }, { status: 500 });
    }
}