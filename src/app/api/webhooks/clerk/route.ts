import { Webhook } from "svix";
import { headers } from "next/headers";
import { clerkClient, WebhookEvent } from "@clerk/nextjs/server";
import User from "@/models/User.model";
import College from "@/models/College.model";
import Faculty from "@/models/Faculty.model";
import Student from "@/models/Student.model";
import { connectDB } from "@/lib/database/connect";
import { ClerkWebHookSecret } from "@/lib/constants";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = ClerkWebHookSecret;

    if (!WEBHOOK_SECRET) {
        throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400
        });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);
    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    }
    catch (err) {
        console.error("Error verifying webhook:", err);
        return new Response("Error occured", {
            status: 400
        });
    }

    const eventType = evt.type;
    try {
        await connectDB();
        if (eventType === "user.created") {
            if (evt.data.organization_memberships) {
                let role = evt.data.organization_memberships[0].role;
                if (role === "org:faculty") {
                    await Faculty.create({
                        clerkID: evt.data.id,
                        college: evt.data.organization_memberships[0].organization.private_metadata?._id, // college mongoose ID
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                        email: evt.data.email_addresses[0].email_address,
                        photo: evt.data.image_url,
                    });
                }
                if (role === "org:student") {
                    await Student.create({
                        clerkID: evt.data.id,
                        college: evt.data.organization_memberships[0].organization.private_metadata?._id, // college mongoose ID
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                        email: evt.data.email_addresses[0].email_address,
                        photo: evt.data.image_url,
                        department: evt.data.private_metadata?.department,
                        semester: evt.data.private_metadata?.semester,
                        rollNo: evt.data.private_metadata?.rollNo,
                    });
                }
            }
            let user = await User.create({
                clerkID: evt.data.id,
                firstName: evt.data.first_name,
                lastName: evt.data.last_name,
                email: evt.data.email_addresses[0].email_address,
                photo: evt.data.image_url,
                role: "user",
            });
            clerkClient.users.updateUser(evt.data.id, {
                privateMetadata: {
                    mongooseID: user._id,
                }
            });
        }
        if (eventType === "user.updated") {
            if (evt.data.organization_memberships) {
                let role = evt.data.organization_memberships[0].role;
                if (role === "org:faculty") {
                    await Faculty.findOneAndUpdate({ clerkID: evt.data.id }, {
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                        email: evt.data.email_addresses[0].email_address,
                        photo: evt.data.image_url,
                    });
                }
                if (role === "org:student") {
                    await Student.findOneAndUpdate({ clerkID: evt.data.id }, {
                        firstName: evt.data.first_name,
                        lastName: evt.data.last_name,
                        email: evt.data.email_addresses[0].email_address,
                        photo: evt.data.image_url,
                        department: evt.data.private_metadata?.department,
                        semester: evt.data.private_metadata?.semester,
                        rollNo: evt.data.private_metadata?.rollNo,
                    });
                }
            }
            await User.findOneAndUpdate({ clerkID: evt.data.id }, {
                firstName: evt.data.first_name,
                lastName: evt.data.last_name,
                email: evt.data.email_addresses[0].email_address,
                photo: evt.data.image_url,
            });
        }
        if (eventType === "user.deleted") {
            await User.findOneAndDelete({ clerkID: evt.data.id });
            await Faculty.findOneAndDelete({ clerkID: evt.data.id });
            await Student.findOneAndDelete({ clerkID: evt.data.id });
        }
        if (eventType === "organization.created") {
            let college = await College.create({
                admin: evt.data.private_metadata?._id, // admin mongoose ID
                name: evt.data.name,
                location: evt.data.private_metadata?.location,
                logo: evt.data.image_url,
            });
            clerkClient.organizations.updateOrganization(evt.data.id, {
                privateMetadata: {
                    mongooseID: college._id,
                }
            });
        }
        if (eventType === "organization.updated") {
            await College.findOneAndUpdate({ clerkID: evt.data.id }, {
                name: evt.data.name,
                location: evt.data.private_metadata?.location,
                logo: evt.data.image_url,
            });
        }
        if (eventType === "organization.deleted") {
            await College.findOneAndDelete({ clerkID: evt.data.id });
        }
        if (eventType === "organizationMembership.created") {
            if (evt.data.role === "org:faculty") {

            }
            if (evt.data.role === "org:student") {

            }
        }
        if (eventType === "organizationMembership.updated") {
            if (evt.data.role === "org:faculty") {

            }
            if (evt.data.role === "org:student") {

            }
        }
        if (eventType === "organizationMembership.deleted") {
            if (evt.data.role === "org:faculty") {

            }
            if (evt.data.role === "org:student") {

            }
        }
    }
    catch (err: any) {
        console.error("Error processing webhook:", err.message);
        return new Response("Error occured", {
            status: 400
        });
    }
    return new Response("", { status: 200 });
}