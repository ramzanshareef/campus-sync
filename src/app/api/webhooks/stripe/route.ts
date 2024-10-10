import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { StripeWebHookSecret } from "@/lib/constants";
import { createUserIfNotExists, makeUserAdmin } from "@/actions/payments/admin";
import { createInvoice, createPayment } from "@/actions/payments/payment";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, StripeWebHookSecret);
    }
    catch (error: any) {
        return Response.json({ error: error.message }, { status: 400 });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    try {
        if (event.type === "checkout.session.completed") {
            const customer = await stripe.customers.retrieve(session.customer as string) as Stripe.Customer;
            const name = session.custom_fields.find(field => field.key === "fullname")?.text?.value as string;
            let data = await createUserIfNotExists({
                name: name,
                email: customer.email as string,
                password: name?.split(" ").join("").toLowerCase() as string,
            });
            let details = {
                paidBy: data.user?._id,
                amount: session.amount_total as number,
                amount_captured: session.amount_total as number,
                billing_details: session.customer_details as object,
                status: "paid",
            };
            await createPayment(data.user?._id, customer.id as string, session.amount_total as number);
            await createInvoice(details);
            await makeUserAdmin(data.user?._id);
        }
        return Response.json({});
    }
    catch (error: any) {
        console.log(error.message + "for " + event.type);
        return Response.json({ status: 500 });
    }
}