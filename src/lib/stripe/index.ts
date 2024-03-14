import Stripe from "stripe";
import { StripeSecretKey } from "../constants";

export const stripe = new Stripe(StripeSecretKey, {
    apiVersion: "2024-09-30.acacia",
    typescript: true
});