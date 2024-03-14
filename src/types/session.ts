import { IronSession } from "iron-session";

export interface UserSession extends IronSession<Object> {
    isAuth?: boolean;
    user?: {
        _id: string;
        name: string;
        email: string;
        role?: string;
        photo?: string;
    };
}