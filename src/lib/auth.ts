import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

type JwtPayload = {
    userId: string;
    email?: string;
    role?: string;
    iat?: number;
    exp?: number;
};

/**
 * Returns decoded payload or null if not present/invalid.
 * Use inside server-side route handlers / server components.
 */
export function getUserFromCookie(): JwtPayload | null {
    const token = cookies().get("token")?.value;
    if (!token) return null;

    try {
        const payload = verifyToken<JwtPayload>(token);
        return payload;
    } catch (err) {
        return null;
    }
}

/**
 * Throws an Error (or returns null) when not authenticated.
 * Use in API route handlers to guard access.
 */
export function requireUser() {
    const user = getUserFromCookie();
    if (!user) throw new Error("Unauthorized");
    return user;
}
