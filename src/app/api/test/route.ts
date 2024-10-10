import { StripeSecretKey } from "@/lib/constants";
import Stripe from "stripe";

export async function GET() {
    try {
        const stripe = new Stripe(StripeSecretKey);
        let id = "cs_test_a131jMmBveOGugR6FcidjdCPOOZvSRN43LRGn5Io8p4nKNfa4eHh5agmK1";
        const session = await stripe.checkout.sessions.retrieve(id);
        return Response.json(session);
    } catch (error: any) {
        return Response.json({
            error: error.message
        });
    }
}